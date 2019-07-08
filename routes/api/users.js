const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Item Model
const User = require('../../models/Users');
 
/**
 * @route POST api/users
 * @desc Registrar un nuevo usuario
 * @access Public
 */

router.post('/', (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Por favor introduzca todos los campos.' });
    }

    User
        .findOne({
            where: {
                email,
            } 
        })
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: `El email ${email} ya se encuenta registrado.` });
            } else {
                const newUser = {
                    name,
                    email,
                    password,
                };

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        User.create(newUser)
                            .then(user => {
                                jwt.sign(
                                    {
                                        id: user.id,
                                    },
                                        config.get('jwtSecret'),
                                    {
                                        expiresIn: 3600,
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
                            });
                    });
                });
            }
        });
});

module.exports = router;