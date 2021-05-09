const koa = require('koa');
const static = require('koa-static');
const koaBoay = require('koa-body');
var cors = require('koa2-cors');
const routers = require('./routers');

let app = new koa();

app.use(cors());

app.use(koaBoay({
    multipart: true,
    formidable: {
        maxFieldsSize: 10 * 1024 * 1024,
    }
}));

app.use(static(__dirname + '/static'));
// 路由挂载
routers(app);

app.listen(4000, () => {
    console.log('run...');
})