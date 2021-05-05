// 操作文章相关路由
const Router = require('koa-router');
const articleService = require('../service/article');

router = new Router({prefix:'/article'});
// 生成文章
router.post('/create',articleService.create);
// 获取文章
router.get('/:id',articleService.getArticle);
// 更新文章
router.patch('/:id',articleService.coverageArticle);
// 删除文章
router.delete('/:id',articleService.delete);
// 
// router.get('/:id/post',articleService.getArticlelist);

module.exports = router