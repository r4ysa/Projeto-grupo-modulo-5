const { Sequelize } = require('sequelize')

//conexõ com o banco de dados
const sequelize = new Sequelize('bancodedados', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

//tratamento de erro
try {
    sequelize.authenticate()
    console.log('logado com sucesso')
}catch(err){
   console.log(`falha na conexão: ${err}`)
}

module.exports = sequelize;