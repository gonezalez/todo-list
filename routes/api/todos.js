const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Todo = require('../../models/Todos');

/**
 * @route GET api/todos
 * @desc Obtiene todos los todos
 * @access Private
 */

 router.get('/', (req, res) => {
    Todo
        .findAll({
            order: [
                ['date', 'DESC'],
            ]
        })
        .then(todos => res.json(todos));
 });    
 
/**
 * @route POST api/todos
 * @desc Crea un nuevo todo
 * @access Private
 */

router.post('/', auth, (req, res) => {
    Todo
        .create({
            name: req.body.name,
            date: Date.now(),
        }, {
            fields: ['name', 'date'],
        })
        .then(todo => res.json(todo));
});

/**
 * @route DELETE api/todos
 * @desc Elimina un todo existente
 * @access Private
 */

router.delete('/:id', auth, (req, res) => {
    Todo
        .destroy({
            where:{
                id: req.params.id,
            }
        })
        .then(rowCount => {
            if (rowCount > 0) {
                res.json({ success: true })
            } else {
                res.status(404).json({ success: false })
            }
        })
        .catch(err => res.status(404).json({ success: false }));
});

/**
 * @route PUT api/todos
 * @desc Editar un todo existente
 * @access Private
 */

router.put('/:id', (req, res) => {
    Todo
        .findOne({
            where: {
                id: req.params.id,
            },
        })
        .then(todo => {
            if (todo) {
                todo
                    .update({
                        name: req.body.name,
                    })
                    .then(() => res.json(todo));
            } else {
                res.status(404).json({ success: false });
            }
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;