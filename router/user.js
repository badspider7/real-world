const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')  //token 验证


//用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

//用户注册
router.post('/users', userValidator.register,userCtrl.register)

//获取当前登录用户
router.get('/users', auth, userCtrl.getCurrentUser)

//更新当前登录用户
router.put('/users',auth, userCtrl.updateCurrentUser)



module.exports = router