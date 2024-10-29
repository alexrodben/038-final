require('dotenv').config();
const express = require('express');
const cors = require('./middleware/cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS para todas las rutas
app.use(cors);

// Para manejar JSON
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
