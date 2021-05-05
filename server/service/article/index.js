// 文章相关路由操作

const article = require('../../model/article');
const user = require('../../model/user');
const column = require('../../model/column');
const controller = require('../../controller/controller')

module.exports = {
    async create(ctx) {
        // 获取上传数据
        let articleData = ctx.request.body;
        // 生成生成时间
        articleData.createtime = new Date().valueOf();
        // 创建文章
        let data = await article.create(articleData);
        // 获取作者信息
        let author = await user.getUserById(data.author);
        // 融合消息
        data.author = author[0];
        // 有id成功
        if (data._id) {
            controller(ctx, 1, data);
        } else {
            controller(ctx, 0, {});
        }
    },
    // 获取单条文章
    async getArticle(ctx) {
        // 获取id
        let { id } = ctx.params;
        //  查数据
        let data = await article.getArticleById(id);
        //  作者数据
        let author = await user.getUserById(data.author);
        // 数据融合
        data.author = author[0];
        if (data._id) {
            controller(ctx, 1, data);
        } else {
            controller(ctx, 0, {});
        }
    },
    // 更新文章
    async coverageArticle(ctx) {
        // 获取id
        let { id } = ctx.params;
        // 获取上传数据
        let newData = ctx.request.body;
        // 跟新数据
        let data = await article.updata(id, newData);
        // 获取专栏
        let colum = await column.getById(data.columnid);
        // 获取作者
        let author = await user.getUserById(data.author);
        // 信息融合
        data.colum = colum;
        data.author = author[0];

        if (data._id) {
            controller(ctx, 1, data);
        } else {
            controller(ctx, 0, {});
        }
    },
    // 删除文章
    async delete(ctx) {
        // 获取id
        let { id } = ctx.params;
        // 删除
        let state = await article.delete(id);

        if (state) {
            // 成功
            controller(ctx, 1, {});
        } else {
            controller(ctx, 0, {});
        }
    },
    // 获取文章列表
    async getArticlelist(ctx) {
        // 获取id
        let { id } = ctx.params;
        // 当前页数和数据量
        let { current, size } = ctx.query;
        // 查找数据
        let data = await article.getArticleList(id, current, size);

        if (data.list.length != 0) {
            controller(ctx, 1, data);
        } else {
            controller(ctx, 0, {});
        }
    }
}