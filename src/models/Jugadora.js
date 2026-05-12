const mongoose = require('mongoose');

const jugadoraSchema = new mongoose.Schema({
    nombreCompleto: { 
        type: String, 
        required: [true, 'El nombre de la jugadora es obligatorio'] 
    },
    numeroCamiseta: { 
        type: Number, 
        required: [true, 'El número de camiseta es obligatorio'],
        min: [1, 'El número no puede ser menor a 1']
    },
    posicion: {
        type: String,
        enum: ['Arquera', 'Defensora', 'Mediocampista', 'Delantera'],
        required: true
    },
    equipoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Equipo', // Referencia cruzada al modelo de Equipo
        required: [true, 'La jugadora debe pertenecer a un equipo']
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Jugadora', jugadoraSchema);