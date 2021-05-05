const Router = require('koa-router');
const userService = require('../service/user');

router = new Router({prefix:'/user'})

// 注册路由
router.post('/enroll', userService.enroll);
// 登录路由
router.post('/login', userService.login);
// 获取用户
router.get('/getuser', userService.getuser);
// 更新用户
router.patch('/coveruser',userService.coveruser);
// 退出登录
router.get('/outlogin', userService.outLogin);

module.exports = router;