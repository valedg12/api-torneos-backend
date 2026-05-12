const mongoose = require('mongoose');

const torneoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del torneo es obligatorio'],
        trim: true,
        unique: true
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de finalización es obligatoria']
    },
    estado: {
        type: String,
        enum: ['Inscripción', 'En Curso', 'Finalizado'],
        default: 'Inscripción'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Torneo', torneoSchema);