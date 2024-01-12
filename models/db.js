const Sequelize = require('sequelize')

const sequelize = new Sequelize('postapp', 'root', 'senhamysql', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}