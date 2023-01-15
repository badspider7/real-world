const express = require('express')

const router = express.Router()
const { getArticleTag} = require('../controller/tag')

//获取文章的标签
router.get('/',getArticleTag)

module.exports = router