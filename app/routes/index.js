const express = require('express');
const userRoutes = require('./users');
const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));  // Para health checks
router.use('/usuarios', userRoutes);  // Todos los endpoints de usuarios

module.exports = router;
