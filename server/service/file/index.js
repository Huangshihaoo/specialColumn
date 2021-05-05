// 文件路由处理
const fs = require('fs');
const path = require('path');
const fileModel = require('../../model/file');
const conaroller = require('../../controller/controller');
module.exports = {
    // 上传文件
    async updata(ctx) {
        // 获取文件
        const file = ctx.request.files.file;
        // 读取临时文件夹里的文件（file.path）临时文件路径
        const reader = fs.createReadStream(file.path);
        //  保存路径
        let filePath = path.join('static/images') + `/${new Date().valueOf() + file.name}`;
        // 创建文件可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);

        let data = await fileModel.updata({ filePath });

        if (data) {
            conaroller(ctx, 1, data);
        } else {
            conaroller(ctx, 0, {});
        }
    }
}