const express = require('express');
const router = express.Router();
const { crearPartido, registrarTarjeta } = require('../controllers/partidoController');

// Ruta estándar para crear el partido
router.post('/', crearPartido);

// Ruta específica para inyectar una tarjeta en un partido concreto
router.post('/:id/tarjetas', registrarTarjeta);

module.exports = router;