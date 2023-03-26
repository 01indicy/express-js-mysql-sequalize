const router = require('express').Router()
const controller = require('../controller/controller')
router.get('/',(req, res) => res.send({msg:'default route from controller'}))
router.get('/get-users',controller.readUsers)
router.get('/get-users/:id',controller.readSingleUser)
router.post('/create-user',controller.createNewUser)
router.patch('/update-user/:id',(req, res) => res.send({msg:'update user route'}))
router.delete('/delete-user/:id',(req, res) => res.send({msg:'delete user route'}))

module.exports = router;