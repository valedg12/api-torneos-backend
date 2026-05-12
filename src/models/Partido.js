const mongoose = require('mongoose');

// 1. Definimos el Subesquema para las tarjetas
const tarjetaSchema = new mongoose.Schema({
    jugadoraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugadora',
        required: true
    },
    equipoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo', // Referencia útil para calcular estadísticas por equipo rápidamente
        required: true
    },
    tipo: {
        type: String,
        enum: ['Verde', 'Amarilla', 'Roja'], // Adaptado a la reglamentación específica del deporte
        required: true
    },
    minuto: {
        type: Number,
        required: true,
        min: [1, 'El minuto no puede ser menor a 1']
    }
}, { 
    _id: false // Evitamos que MongoDB gaste recursos generando un ID único para cada tarjeta
}); 

// 2. Definimos el Esquema Principal del Partido
const partidoSchema = new mongoose.Schema({
    torneoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Torneo',
        required: true
    },
    equipoLocal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    equipoVisitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    fechaProgramada: {
        type: Date,
        required: true
    },
    golesLocal: {
        type: Number,
        default: 0,
        min: 0
    },
    golesVisitante: {
        type: Number,
        default: 0,
        min: 0
    },
    estado: {
        type: String,
        enum: ['Programado', 'En Juego', 'Finalizado', 'Suspendido'],
        default: 'Programado'
    },
    tarjetas: [tarjetaSchema] // Aquí incrustamos el subesquema como un Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Partido', partidoSchema);