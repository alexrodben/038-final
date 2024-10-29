const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Habilitar CORS para todas las rutas
app.use(cors());
app.use(express.json()); // Para manejar JSON

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
