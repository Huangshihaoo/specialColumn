/**
 * 路由主路口
*/
const userRouter = require('./routers/userRouter');
const columnRouter = require('./routers/columnRouter');
const articleRouter = require('./routers/articleRouter');
const fileRouter = require('./routers/fileRouter');

module.exports = (app) => {
    app.use(userRouter.routes());
    app.use(columnRouter.routes());
    app.use(articleRouter.routes());
    app.use(fileRouter.routes());
}