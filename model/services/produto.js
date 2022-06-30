//produto.js
const Sequelize = require('sequelize');
const database = require('./bdorm');

const Produto = database.sequelize.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    preco: Sequelize.DECIMAL
})

module.exports = { Produto }
