const express = require('express')
const morgan = require('morgan')  //日志输出
const cors = require('cors') //请求跨域
const router = require('./router/index')
const erroHandler = require('./middleware/error-handler')
require('./model/index')
const app = express()

//中间件的使用
app.use(morgan('dev'))
//解析请求体 res.body
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000


//挂载路由
app.use('/api', router)

//挂载统一处理服务端错误中间件
app.use(erroHandler())

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})