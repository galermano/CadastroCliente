//npm install sequelize mysql2
const Sequelize = require('sequelize');
const sequelize = new Sequelize('agendamento', 'root', 'root',
    { dialect: 'mysql', host: 'localhost', port: 3306 });
module.exports = sequelize
