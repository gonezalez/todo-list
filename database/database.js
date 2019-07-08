const Sequelize = require('sequelize');
const config = require('config');

module.exports = sequelize = new Sequelize(
    config.get('db.name'),
    config.get('db.user'),
    config.get('db.password'),
    {
        host: config.get('db.host'),
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000,
        },
        logging: false,
    },
)
