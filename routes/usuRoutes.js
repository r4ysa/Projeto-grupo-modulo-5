const express = require('express')
const router = express.Router()
const UsuController = require('../controllers/UsuController')


router.get('/login', UsuController.login)
router.post('/login', UsuController.loginPost)
router.get('/register', UsuController.register)
router.post('/register', UsuController.registerPost)
router.get('/logout', UsuController.logout)

module.exports = router