// 操作分类列表
class Column {
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
    // 获取专栏列表
    async getColumnList(current, size) {
        // 开始数
        let start = current
        // 开始数等于0就等于0，不等于0就乘以页数
        if (current === 0) {
            start = 0
        } else {
            start = current * size;
        }

        let data = {};
        // 专栏数量
        data.count = await this.getCount();
        // 专栏页数
        data.pageSize = Math.ceil(data.count / size);
        // 开始数是否大于最大数
        start > data.pageSize ? data.pageSize : start;

        let [rows] = await this.con.execute(`SELECT * FROM colum LIMIT ?,?`, [start, size]);

        data.currentPage = current
        data.currentPage = data.currentPage
        // 0 6 0 0
        // 1 6 6 1
        // 2 6 12 2
        data.list = rows;

        return data;
    }
    // 获取数量
    async getCount() {

        let [rows] = await this.con.execute('SELECT * FROM colum');

        return rows.length;
    }

    // 获取专栏
    async getColumnById(id) {
        let [rows] = await this.con.execute('select * from colum where columnid = ?', [id])

        let arr = await this.getColumnArticle(id, 0)
        rows[0].list = arr
        // let data = {}
        return rows[0]
    }
    // 更新数据
    async upData(id, colunmData) {
        // 新时间
        colunmData.createtime = new Date().valueOf();

        let data = {};

        let [rows] = await this.con.execute(`UPDATE colum SET title = ?,descpt = ?,avatar = ?,createtime = ? WHERE _id = ?`, [colunmData.title, colunmData.descpt, colunmData.avatar, colunmData.createtime, id])
        // 成功 1 查数据 失败 0
        if (rows.affectedRows) {
            // 查专栏数据
            data = await this.getBy_Id(id)
        }

        return data
    }
    // 查找专栏
    async getBy_Id(id) {
        let [arr] = await this.con.execute('select * from colum where _id = ?', [id])
        return arr[0]
    }
    async getById(id) {
        let [arr] = await this.con.execute('select * from colum where columnid = ?', [id])
        return arr[0]
    }
    // 查找专栏文章
    async getColumnArticle(id, current = 0, size = 5) {

        let [arr] = await this.con.execute('select * from article where columnid = ? ORDER BY createtime DESC', [id]);
        // 总数
        let count = arr.length;
        //最大页数 -1 是应为从0开始
        let maxPage = Math.ceil(count / size) - 1;
        // 开始页数
        let start = current;
        // 开始页数超过最大页数就等于最大页数
        start = start > maxPage ? maxPage : start
        // 开始页数 ×5
        start = start * size;
        // 截取5条
        let end = Number(start) + Number(size)
        let array = arr.slice(start, end);
        let obj = { current, maxPage, size, list: array };
        return obj
    }
}

module.exports = new Column()