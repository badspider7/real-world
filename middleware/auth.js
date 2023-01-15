const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const {User} = require('../model')

module.exports = async(req, res, next) => {
    //从请求头获取 token 数据
    let token = req.headers.authorization
    token = token ?token.split('Bearer ')[1]:null
    //验证  token 是否有校
    if (!token) {
        return res.status(401).end('token 不存在')
    }
    try {
        //有校 -> 把用户信息读取出来，挂载到 req 请求对象上  继续往后执行
        const decodedToken = await verify(token, jwtSecret)
        req.user = await User.findById(decodedToken.userId)
        next()
        // console.log(decodedToken)
    } catch (err) {
        //无效  ->  响应 401 状态码
        return res.status(401).end('token不对')
    }


}