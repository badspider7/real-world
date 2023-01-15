const { User } = require('../model/index')
const jwt = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')

//用户登录
exports.login = async (req, res, next) => {
    try {
        //生成token
        const user = req.user.toJSON()
        const token = await jwt.sign({
            userId:user._id
        }, jwtSecret, {
            expiresIn: 60*60*24*7  //过期时间为7天
        })

        //发送成功响应
        delete user.password
        res.status(200).json({
            ...user,
            token
        })

    } catch (err) {
        next(err) //错误处理中间件
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try {
        //1.获取请求体数据
        console.log(req.body);

        //3. 验证通过，将数据保存到数据库
        let user = new User(req.body.user)

        //保存到数据库
        await user.save()

        user = user.toJSON()
        delete user.password  //删除user的密码，返回的时候就不会携带密码了

        //4.发送成功响应
        res.status(201).json({
            user
        })
    } catch (err) {
        next(err) //错误处理中间件
    }
}

//获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.status(200).json({
            user:req.user
        })
    } catch (err) {
        next(err) //错误处理中间件
    }
}


//更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.send('post /users/login')
    } catch (err) {
        next(err) //错误处理中间件
    }
}
