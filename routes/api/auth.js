const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

const router = express.Router();

// Item Model
const User = require('../../models/Users');

/**
 * @route POST api/auth
 * @desc Autenticacion de usuario
 * @access Public
 */

router.post('/', (req, res) => {
    const {
        email,
        password,
    } = req.body;

    if (!email || !password) { 
        return res.status(400).json({ msg: 'Por favor introduzca todos los campos.' });
    }

    User
        .findOne({
            where: {
                email,
            },
        })
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: `El email ${email} no se encuenta registrado.` });
            } else {
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            return res.status(400).json({ msg: `Credenciales invalidas.` });
                        } else {
                            jwt.sign(
                                {
                                    id: user.id,
                                },
                                    config.get('jwtSecret'),
                                {
                                    expiresIn: 7200,
                                },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token, 
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                        },
                                    })
                                }
                            );
                        }
                    })
            }
        });
});


/**
 * @route GET api/auth/user
 * @desc Obtener informacion del usuario autenticado.
 * @access Private
 */

router.get('/user', auth, (req, res) => {
    User
        .findOne({
            attributes: ['name', 'email', 'register_date'],
            where: {
                id: req.user.id,
            }
        })
        .then(user => res.json(user));
});

module.exports = router;