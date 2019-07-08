const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Todo = sequelize.define('todos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
}, {
    timestamps: false,
});

module.exports = Todo;