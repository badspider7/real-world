//获取文章标签
exports.getArticleTag = async (req, res, next) => {
    try {
        //处理请求
        res.send('get ./profile/:username')
    } catch (err) {
        next(err)
    }
}