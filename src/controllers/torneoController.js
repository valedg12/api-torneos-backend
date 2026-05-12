const Torneo = require('../models/Torneo');

const crearTorneo = async (req, res) => {
    try {
        // req.body contiene los datos en formato JSON que envía el cliente
        const nuevoTorneo = new Torneo(req.body); 
        
        // Guardamos el documento en MongoDB Atlas
        const torneoGuardado = await nuevoTorneo.save(); 
        
        // Respondemos con código 201 (Created) y el objeto guardado
        res.status(201).json(torneoGuardado);
    } catch (error) {
        // Si hay un error (ej. falta un campo requerido o el nombre ya existe), enviamos un 400 (Bad Request)
        res.status(400).json({ 
            mensaje: 'Error al crear el torneo. Verifica los datos enviados.', 
            error: error.message 
        });
    }
};


const obtenerTorneos = async (req, res) => {
    try {
        // El método .find() sin argumentos devuelve todos los documentos de la colección
        const torneos = await Torneo.find(); 
        res.status(200).json(torneos);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error interno del servidor al consultar la base de datos', 
            error: error.message 
        });
    }
};

const Partido = require('../models/Partido');
const Equipo = require('../models/Equipo');


const obtenerPosiciones = async (req, res) => {
    try {
        const { id: torneoId } = req.params;

        // 1. Buscamos todos los equipos inscriptos en este torneo
        const equipos = await Equipo.find({ torneoId });
        
        // 2. Buscamos solo los partidos de este torneo que ya terminaron
        const partidosJugados = await Partido.find({ 
            torneoId, 
            estado: 'Finalizado' 
        });

        // 3. Inicializamos la tabla en memoria
        let tabla = equipos.map(equipo => ({
            equipoId: equipo._id,
            nombre: equipo.nombre,
            puntos: 0,
            jugados: 0,
            ganados: 0,
            empatados: 0,
            perdidos: 0,
            golesFavor: 0,
            golesContra: 0,
            diferenciaGoles: 0
        }));

        // 4. Procesamos cada partido
        partidosJugados.forEach(partido => {
            const indexLocal = tabla.findIndex(e => e.equipoId.toString() === partido.equipoLocal.toString());
            const indexVisitante = tabla.findIndex(e => e.equipoId.toString() === partido.equipoVisitante.toString());

            if (indexLocal !== -1 && indexVisitante !== -1) {
                // Actualizamos partidos jugados y goles
                tabla[indexLocal].jugados += 1;
                tabla[indexVisitante].jugados += 1;
                
                tabla[indexLocal].golesFavor += partido.golesLocal;
                tabla[indexLocal].golesContra += partido.golesVisitante;
                
                tabla[indexVisitante].golesFavor += partido.golesVisitante;
                tabla[indexVisitante].golesContra += partido.golesLocal;

                // Lógica de puntos (3 victoria, 1 empate, 0 derrota)
                if (partido.golesLocal > partido.golesVisitante) {
                    tabla[indexLocal].puntos += 3;
                    tabla[indexLocal].ganados += 1;
                    tabla[indexVisitante].perdidos += 1;
                } else if (partido.golesLocal < partido.golesVisitante) {
                    tabla[indexVisitante].puntos += 3;
                    tabla[indexVisitante].ganados += 1;
                    tabla[indexLocal].perdidos += 1;
                } else {
                    tabla[indexLocal].puntos += 1;
                    tabla[indexVisitante].puntos += 1;
                    tabla[indexLocal].empatados += 1;
                    tabla[indexVisitante].empatados += 1;
                }
            }
        });

        // 5. Calculamos diferencia de goles y ORDENAMOS la tabla
        tabla = tabla.map(equipo => {
            equipo.diferenciaGoles = equipo.golesFavor - equipo.golesContra;
            return equipo;
        }).sort((a, b) => {
            if (b.puntos !== a.puntos) return b.puntos - a.puntos; // Mayor puntaje primero
            if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles; // Si empatan, mejor diferencia de gol
            return b.golesFavor - a.golesFavor; // Si siguen empatados, más goles a favor
        });

        res.status(200).json(tabla);

    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al generar la tabla de posiciones', 
            error: error.message 
        });
    }
};


module.exports = {
    crearTorneo,
    obtenerTorneos,
    obtenerPosiciones
};
