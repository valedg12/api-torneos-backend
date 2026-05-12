const express = require('express');
const router = express.Router();
const { crearJugadora, obtenerJugadoras } = require('../controllers/jugadoraController');

router.post('/', crearJugadora);
router.get('/', obtenerJugadoras);

module.exports = router;