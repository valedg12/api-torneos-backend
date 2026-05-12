const Equipo = require('../models/Equipo');

// @desc    Crear un nuevo equipo
// @route   POST /api/equipos
const crearEquipo = async (req, res) => {
    try {
        const nuevoEquipo = new Equipo(req.body);
        const equipoGuardado = await nuevoEquipo.save();
        res.status(201).json(equipoGuardado);
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'Error al registrar el equipo.', 
            error: error.message 
        });
    }
};

// @desc    Obtener todos los equipos
// @route   GET /api/equipos
const obtenerEquipos = async (req, res) => {
    try {
        // Usamos populate para traer el nombre del torneo asociado al ID
        const equipos = await Equipo.find().populate('torneoId', 'nombre');
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error del servidor al obtener equipos', 
            error: error.message 
        });
    }
};

module.exports = { crearEquipo, obtenerEquipos };