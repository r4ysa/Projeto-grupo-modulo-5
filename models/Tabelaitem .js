const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Usuario = require('./Usuario')

const Tabelaitem = db.define('Tabelaitems', { // CONST MAIUSCULO SINGULAR NOME TABELA MAIUSCULO PLURAL
    item: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true, //AQUI ERA TITLE
    },
    preco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
})

Tabelaitem.belongsTo(Usuario)
Usuario.hasMany(Tabelaitem)

module.exports = Tabelaitem