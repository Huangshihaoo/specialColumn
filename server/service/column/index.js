// 专栏相关路由操作
const column = require('../../model/column');
const controller = require('../../controller/controller');

module.exports = {
    // 获取专栏列表
    async getColumnList(ctx) {
        let { current, size } = ctx.query

        let data = await column.getColumnList(current, size);

        // data.list.length === 0 没有数据
        if (data.list.length === 0) {

            controller(ctx, 0, {});
        } else {

            controller(ctx, 1, data);
        }
    },
    // 查专栏
    async getColumnById(ctx) {

        let { id } = ctx.params;
        // 根据id查找专栏
        let columnData = await column.getColumnById(id);
        // 有数据成功 
        if (columnData) {
            controller(ctx, 1, columnData);
        } else {
            controller(ctx, 0, {});
        }
    },
    // 更新
    async coverageColumn(ctx) {

        let { id } = ctx.params;

        let columnData = ctx.request.body;
        // 更新
        let arr = await column.upData(id, columnData);

        if (arr._id) {
            controller(ctx, 1, arr);
        } else {
            controller(ctx, 0, {});
        }
    },
    // 获取专栏相关文章
    async getColumnArticleList(ctx) {
        let { id, current, size } = ctx.query;
        
        let res = await column.getColumnArticle(id, current, size);

        if (res.list.length != 0) {
            controller(ctx, 1, res);
        } else {
            controller(ctx, 0, {});
        }
    }
}