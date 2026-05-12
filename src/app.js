require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Importar rutas
const torneoRoutes = require('./routes/torneoRoutes');
const equipoRoutes = require('./routes/equipoRoutes');
const jugadoraRoutes = require('./routes/jugadoraRoutes');
const partidoRoutes = require('./routes/partidoRoutes');
const app = express();
connectDB();

app.use(express.json());

// Montar las rutas
// Cada vez que llegue una petición a '/api/torneos', se la derivamos a torneoRoutes
app.use('/api/torneos', torneoRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/jugadoras', jugadoraRoutes);
app.use('/api/partidos', partidoRoutes);



// Endpoint de diagnóstico que ya teníamos
app.use('/api/ping', (req, res) => {
    res.status(200).json({ mensaje: 'Servidor operativo', estado: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[Servidor] Escuchando en el puerto ${PORT}`);
});