const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    register_date: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
}, {
    timestamps: false,
});

module.exports = User;