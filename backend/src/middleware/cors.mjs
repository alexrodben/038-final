// cors.js
import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:4200', // Cambia esto según tu necesidad
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

export default cors(corsOptions);
