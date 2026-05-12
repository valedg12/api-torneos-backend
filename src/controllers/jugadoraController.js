const Jugadora = require('../models/Jugadora');

// @desc    Crear una nueva jugadora
// @route   POST /api/jugadoras
const crearJugadora = async (req, res) => {
    try {
        const nuevaJugadora = new Jugadora(req.body);
        const jugadoraGuardada = await nuevaJugadora.save();
        res.status(201).json(jugadoraGuardada);
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'Error al registrar la jugadora.', 
            error: error.message 
        });
    }
};

// @desc    Obtener todas las jugadoras (opcionalmente filtradas por equipo)
// @route   GET /api/jugadoras
// @access  Público
const obtenerJugadoras = async (req, res) => {
    try {
        // Permitimos filtrar por equipo si viene en la query (ej: /api/jugadoras?equipoId=123)
        const filter = req.query.equipoId ? { equipoId: req.query.equipoId } : {};
        const jugadoras = await Jugadora.find(filter).populate('equipoId', 'nombre');
        res.status(200).json(jugadoras);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error del servidor al obtener jugadoras', 
            error: error.message 
        });
    }
};

module.exports = { crearJugadora, obtenerJugadoras };