//获取用户资料
exports.getProfile = async (req, res, next) => {
    try {
        //处理请求
        res.send('get ./profile/:username')
    } catch (err) {
        next(err)
    }
}

//关注用户
exports.followUser = async (req, res, next) => {
    try {
        //处理请求
        res.send('get ./profile/:username')
    } catch (err) {
        next(err)
    }
}

//取消关注用户
exports.unFollowUser = async (req, res, next) => {
    try {
        //处理请求
        res.send('get ./profile/:username')
    } catch (err) {
        next(err)
    }
}
