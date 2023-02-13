const { DataTypes } = require('sequelize')

const db = require('../db/conn') //importação do banco de dados

//Criação da tabela e colunas
const Usuario = db.define('Usuarios', { //define a tabela
    name: { //coluna
        type: DataTypes.STRING, //tipo de dado
        require: true,
    },
    email: {  //coluna
        type: DataTypes.STRING,
        require: true,
    },
    password: { //coluna
        type: DataTypes.STRING,
        require: true,
    },
})

module.exports = Usuario