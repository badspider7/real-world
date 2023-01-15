const { body,param } = require('express-validator')
const validate = require('../middleware/validate')
const {Article} = require('../model')


exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空'),
])


exports.getArticle = validate([
    validate.isValidObjectId(['params'],'articleId')
    // param('articleId').custom(async value => {
    //     if (!mongoose.isValidObjectId(value)) {
    //         return Promise.reject('文章ID 类型错误')
    //     }
    // })
])

exports.updateArticle = [
    validate([
        validate.isValidObjectId(['params'],'articleId')
    ]),
    // 校验文章是否存在
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if(!article) {
            return res.status(404).end('文章不存在')
        }
        next()
    },
    //修改的文章作者是否是当前登录用户
    async (req, res, next) => {
        if (req.user._id.toSting !== req.article.author.toSting) {
            return res.status(403).end('不是本文章作者不能更新')
        }
        next()
    }
]



exports.deleteArticle = exports.updateArticle