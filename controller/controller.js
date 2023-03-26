const controller = () => { }
const {User} = require('../models');

controller.createNewUser = async (req, res) => {
    await User.sequelize.transaction(async  () => {
        await User.findOne({ where: { email: req.body.email} }).then(async (check_response) => {
            if (check_response === null) {
                await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                }).then((response) => {
                    res.send({response})
                }).catch((err) => {
                    res.send({error:err.message})
                })
            } else {
                res.send({msg: `email: ${req.body.email} is already used`})
            }
        }).catch((err) => {
            console.error(err)
        })
    })
}

controller.readUsers = async (req,res) => {
    await User.sequelize.transaction(async () => {
        await User.findAll().then(async (users) => {
            const response = []
            users.forEach(user => response.push(user['dataValues']))
            res.send({users: response})
        }).catch((err) => {
            console.log('error .. '+ err)
        })
    })
}

controller.readSingleUser = async (req,res) => {
    await User.sequelize.transaction(async () => {
        await User.findByPk(req['params'].id).then((user) => {
            res.send((user === null) ? {user:`user with id ${req.params.id} not found`} : {user: user['dataValues']})
        }).catch((err) => {
            console.error(err)
        })
    })
}

controller.updateUserDetails = async (req,res) => {
    await User.sequelize.transaction(async () => {
        await User.findByPk(req.body.id).then(async (user) => {
            if (user === null) {
                res.send({msg: `user with id ${req.body.id} not found`})
            } else {
                await User.update({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email
                }, { where: { id:req.body.id } }).then((response) => {
                    res.send({msg:'user information updated'})
                }).catch((err) => {
                    console.error(err)
                })
            }
        })
    })
}

controller.deleteUser = async (req,res) => {
    await User.sequelize.transaction(async () => {
        await User.findByPk(req.params.id).then(async (user) => {
            if(user === null){
                res.send({msg: `user with id ${req.params.id} not found`})
            }else{
                await User.destroy({ where: {id:req.params.id} }).then((response) => {
                    res.send({msg:`user with id ${req.params.id} deleted`})
                }).catch((err) => console.log(err))
            }
        })
    })
}

module.exports = controller;