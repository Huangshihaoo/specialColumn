// 只负责返回数据
module.exports = (ctx,  condition, returnData) => {
    let data = {};
    if(condition) {
        data.code = 0;
        data.msg = 'success';
        data.data = returnData
    }else {
        data.code = 1;
        data.msg = 'unsuccessful';
        data.data = returnData;
    }
    ctx.body = data;
}