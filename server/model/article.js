// 操作数据库文章表
class Article {

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
    // 新建文章
    async create(data) {
        let [rows] = await this.con.execute(`insert into article (title, content, image, author,createtime,columnid) values (?,?,?,?,?,?)`, [data.title, data.content, data.url, data.author, data.createtime, data.columnid]);

        let obj = {};

        if (rows.insertId) {
            obj = await this.getArticleById(rows.insertId);
        }

        return obj
    }
    // 查找文章
    async getArticleById(id) {
        let [rows] = await this.con.execute(`select * from article where _id = ?`, [id]);
        return rows[0];
    }
    //  更新文章
    async updata(id, newData) {
        let data = {};

        newData.createtime = new Date().valueOf();

        let [rows] = await this.con.execute(`UPDATE article SET title = ?,content = ?, image = ?,createtime = ? WHERE _id = ?`, [newData.title, newData.content, newData.image, newData.createtime, id])
        // 成功 1 查数据 失败 0
        if (rows.affectedRows) {
            data = await this.getArticleById(id)
        }

        return data
    }
    // 删除文章
    async delete(id) {
        let [rows] = await this.con.execute(`delete from article where _id = ?`, [id])

        return rows.affectedRows
    }
    // 分页获取文章
    async getArticleList(id, current = 0, size = 5) {
        // 开始数
        let start = current * size;
        // 如果开始数小于0 就等于0
        if (start < 0) {
            start = 0
        }
        // 装数据
        let data = {};
        // 总数量
        data.count = await this.getCount();
        // 页数
        data.pageSize = Math.ceil(data.count / size);
        //  如果开始数大于页数就等于页数
        start > data.pageSize ? data.pageSize : start;
        // 当前页
        data.currentPage = start;

        let [rows] = await this.con.execute(`SELECT * FROM article  WHERE author = ? LIMIT ?,?`, [id, start, size]);

        data.list = rows;

        return data;
    }
    // 获取数量
    async getCount() {
        let [rows] = await this.con.execute('SELECT * FROM article');
        return rows.length;
    }
}

module.exports = new Article();