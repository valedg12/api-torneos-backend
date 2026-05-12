const Partido = require('../models/Partido');

// @desc    Crear un nuevo partido programado
// @route   POST /api/partidos
const crearPartido = async (req, res) => {
    try {
        const nuevoPartido = new Partido(req.body);
        const partidoGuardado = await nuevoPartido.save();
        res.status(201).json(partidoGuardado);
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'Error al programar el partido.', 
            error: error.message 
        });
    }
};

// @desc    Registrar una tarjeta dentro de un partido existente
// @route   POST /api/partidos/:id/tarjetas
const registrarTarjeta = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID del partido desde la URL
        const nuevaTarjeta = req.body; // Los datos de la tarjeta vienen en el JSON

        // 1. Buscamos el partido en la base de datos
        const partido = await Partido.findById(id);
        
        if (!partido) {
            return res.status(404).json({ mensaje: 'Partido no encontrado' });
        }

        // 2. Insertamos la tarjeta en el subdocumento
        partido.tarjetas.push(nuevaTarjeta);
        
        // 3. Guardamos el partido actualizado
        await partido.save();

        res.status(201).json(partido);
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'Error al registrar la incidencia disciplinaria.', 
            error: error.message 
        });
    }
};

module.exports = { crearPartido, registrarTarjeta };