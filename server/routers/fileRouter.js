const Router = require('koa-router');

const fileService = require('../service/file');

router = new Router()

// 文件上传
router.post('/file/updata',fileService.updata);

module.exports = router;