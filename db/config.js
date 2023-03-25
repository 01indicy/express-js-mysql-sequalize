const {Sequelize,DataType, DataTypes} = require('sequelize')

const sequelize = new Sequelize('sequelize', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log('connect established')

    sequelize.define("tutorial", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        comments: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    });

    sequelize.sync().then(() => {
        console.log('synced db')
    }).catch((err) => {
        console.log(err)
    })
}).catch((err) => {
    console.error('Unable to connect to the database: ', err);
})

module.exports = sequelize