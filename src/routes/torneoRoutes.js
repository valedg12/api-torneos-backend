const express = require('express');
const router = express.Router();

const { crearTorneo, obtenerTorneos, obtenerPosiciones } = require('../controllers/torneoController');

router.post('/', crearTorneo);
router.get('/', obtenerTorneos);

// Agregamos esta línea (es importante que vaya debajo de las otras)
router.get('/:id/posiciones', obtenerPosiciones);

module.exports = router;