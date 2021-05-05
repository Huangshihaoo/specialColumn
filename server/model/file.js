// 上传图片
class File {
    constructor() {
        this.connection();
    }
    // 链接数据库
    async connection() {
        this.mysql2 = require('mysql2/promise');
        this.con = await this.mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'essayserver',
            password: 'root'
        });
    }
    // 上传图片
    async updata(data) {

        data.createtime = new Date().valueOf();

        let [rows] = await this.con.execute(`insert into images (url,createtime) values (?,?); `, [data.filePath, data.createtime]);

        let img = await this.getImageById(rows.insertId);

        return img;
    }
    // 获取图片
    async getImageById(id) {
        let [rows] = await this.con.execute(`select * from images where _id = ?`, [id]);

        return rows[0];
    }
}

module.exports = new File();