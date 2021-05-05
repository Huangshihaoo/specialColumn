const Router = require('koa-router');
const columnSerrvice = require('../service/column');

router = new Router({prefix:'/column'});

// 获取专栏列表
router.get('/',columnSerrvice.getColumnList);
// 获取专栏信息
router.get('/col/:id',columnSerrvice.getColumnById);
// 更新专栏
router.patch('/:id',columnSerrvice.coverageColumn);
// 获取专栏文章列表
router.get('/articl',columnSerrvice.getColumnArticleList);

module.exports = router;