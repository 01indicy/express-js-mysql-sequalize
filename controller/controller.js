const controller = () => { }
const {User} = require('../models');

controller.createNewUser = async (req, res) => {
    await User.findOne({ where: { email: req.body.email} }).then(async (check_response) => {
        if (check_response === null) {
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }).then((response) => {
                res.send({response})
            }).catch((err) => {
                console.error(err)
            })
        } else {
            res.send({msg: `email: ${req.body.email} is already used`})
        }
    }).catch((err) => {
        console.error(err)
    })
}

controller.readUsers = async (req,res) => {
    await User.findAll().then(async (users) => {
        const response = []
        users.forEach(user => response.push(user['dataValues']))
        res.send({users: response})
    }).catch((err) => {
        console.log('error .. '+ err)
    })
}

controller.readSingleUser = async (req,res) => {
    await User.findByPk(req['params'].id).then((user) => {
        res.send((user === null) ? {user:`user with id ${req.params.id} not found`} : {user: user['dataValues']})
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = controller