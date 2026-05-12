const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del equipo es obligatorio'], 
        unique: true,
        trim: true // Elimina espacios en blanco al principio y al final
    },
    entrenador: { 
        type: String, 
        required: [true, 'El nombre del entrenador es obligatorio'] 
    },
    torneoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Torneo' // Relación con el modelo Torneo que crearemos después
    }
}, { 
    timestamps: true // Crea automáticamente los campos createdAt y updatedAt
});

module.exports = mongoose.model('Equipo', equipoSchema);
