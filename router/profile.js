const express = require('express')
const router = express.Router()
const {getProfile,followUser,unFollowUser} = require('../controller/profile')

//获取用户资料
router.get('/:username', getProfile)


//关注用户
router.post('/:username/follow', followUser)

//取消关注用户
router.delete('/:username/follow', unFollowUser)


module.exports = router