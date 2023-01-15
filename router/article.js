const express = require("express");
const router = express.Router();
const {
  getArticles,
  getFeedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addCommend,
  getCommend,
  deleteCommend,
  FollowArticle,
  unFollowArticle,
} = require("../controller/article");
const auth = require("../middleware/auth");
const  articleValidator  = require("../validator/article");

//获取文章列表
router.get("/", getArticles);

//获取用户关注的作者文章列表
router.get("/feed", getFeedArticles);

//获取文章
router.get("/:articleId", articleValidator.getArticle,getArticle);

//创建文章
router.post("/", auth, articleValidator.createArticle, createArticle);

//更新文章
router.put("/:articleId",auth, articleValidator.updateArticle, updateArticle);

//删除文章
router.delete("/:articleId", auth,articleValidator.deleteArticle, deleteArticle);

//给一个文章添加评论
router.post("/:articleId/comments", addCommend);

//得到一篇文章的评论
router.get("/:articleId/comments", getCommend);

//删除评论
router.delete("/:articleId/comments/:id", deleteCommend);

//收藏文章
router.post("/:articleId/favorite", FollowArticle);

//取消收藏文章
router.delete("/:articleId/favorite", unFollowArticle);

module.exports = router;
