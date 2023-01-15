const { Article, User } = require("../model");

//获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    //处理请求
    const { limit = 20, offset = 0, tag, author } = req.query;

    const filter = {};

    //根据标签查找文章
    if (tag) {
      filter.tagList = tag;
    }
    //根据作者查找文章  
    if (author) {
        const user = await User.findOne({ username: author });
        
        filter.author = user ? user._id : null;
        console.log(user);
      }

    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset)) //跳过多少条
      .limit(Number.parseInt(limit)) //取多少条
        .sort({
          //得到排序的文章 1 为升序  -1 为倒序
          createdAt: -1
      })
    const articlesCount = await Article.countDocuments();
    res.status(200).json({
      articles,
      articlesCount,
    });
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//获取用户关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//获取文章
exports.getArticle = async (req, res, next) => {
  try {
    //处理请求
    const article = await Article.findById(req.params.articleId).populate(
      "author"
    );
    if (!article) {
      return res.status(404).end();
    }
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//创建文章
exports.createArticle = async (req, res, next) => {
  try {
    //处理请求
    const article = new Article(req.body.article);
    article.author = req.user._id;
    article.populate(["author"]);
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    //处理请求
      const article = req.article
      const bodyArticle = req.body
    
      article.title = bodyArticle.title || article.title
      article.description = bodyArticle.description || article.description
      article.body = bodyArticle.body || article.body
      await article.save()
      res.status(200).json({
          article
      })
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    //处理请求
      const article = req.article
      await article.remove()
      res.status(204).end('删除文章成功')
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//给一个文章添加评论
exports.addCommend = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//得到一篇文章的评论
exports.getCommend = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//删除评论
exports.deleteCommend = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//收藏文章
exports.FollowArticle = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};

//取消收藏文章
exports.unFollowArticle = async (req, res, next) => {
  try {
    //处理请求
    res.send("post /users/login");
  } catch (err) {
    next(err); //错误处理中间件
  }
};
