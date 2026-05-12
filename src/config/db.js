const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //Intentamos conectar usando la variable de entorno
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[Base de Datos] Conexión exitosa: ${conn.connection.host}`);

    } catch (error) {
        console.error(`[Base de Datos] Error de conexión: ${error.message}`);
        process.exit(1); // Salir con error
    }
};

module.exports = connectDB;