const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');
const { registerSchema, updateSchema } = require('../schemas/user');

// POST /usuarios/register
router.post('/register', async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newUser = await registerUser(req.body);
        res.status(201).json({ message: 'Usuario registrado', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /usuarios/login
router.post('/login', async (req, res) => {
    try {
        const { token, user } = await loginUser(req.body.email, req.body.password);
        res.json({ token, user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

// GET /usuarios (todos los usuarios)
router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json({ usuarios: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /usuarios/:id (usuario por ID)
router.get('/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ usuario: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /usuarios/:id (actualizar usuario)
router.put('/:id', async (req, res) => {
    try {
        const { error } = updateSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const updatedUser = await updateUser(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /usuarios/:id (eliminar usuario)
router.delete('/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
