const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Configuración CORS (similar a FastAPI)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*']
}));

app.use(express.json());
app.use('/', routes);

const PORT = 8001;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
