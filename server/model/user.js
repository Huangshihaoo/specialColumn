// 用户相关数据操作
class User {
    constructor() {
        this.con();
    }
    // 链接数据库
    async con() {

        this.mysql2 = require('mysql2/promise');

        this.connection = await this.mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'essayserver',
            password: 'root'
        });
    }

    // 添加用户返回用户数据
    async addUser(userData) {
        // 创建专栏
        this.connection.execute(`insert into colum (title ,descpt, avatar,author,createtime,columnid) values (?,?,?,?,?,?)`, [`${userData.username}的专栏`, `${userData.username}的专栏描述,这个描述要长一点才好看，再长一点，再再长一点`, userData.avatar, userData.username, userData.createtime,userData.columnid]);

        // 创建用户
        let [rows] = await this.connection.execute(`INSERT INTO users (email, username, password, createtime, avatar, descpt, colum, columnid) VALUES (?,?,?,?,?,?,?,?)`, [userData.email, userData.username, userData.password, userData.createtime, userData.avatar, userData.descpt, userData.column, userData.columnid]);

        let data = await this.getUserById(rows.insertId);
        // 去掉密码
        delete data[0].password
        return data[0]
    }

    // 根据id查用户
    async getUserById(id) {
        let [rows] = await this.connection.execute(`SELECT * FROM users WHERE id = ?;`, [id]);
        // 去掉密码
        delete rows[0].password

        return rows
    }
    // 查看email是否被注册
    async emailExists(email) {
        let [rows] = await this.connection.execute(`SELECT * FROM users WHERE email = ?;`, [email]);

        return rows;
    }

    // 登录
    async login(user) {
        let [rows] = await this.connection.execute(`SELECT * FROM users WHERE email = ? AND password = ?;`, [user.email, user.password]);
        // 去掉密码
        if(rows[0].password) {
            delete rows[0].password
        }
        return rows;
    }

    // 更新用户数据 受到影响返回1 否则返回0
    async updata(id, user) {
        let data = {};

        user.createtime = new Date().valueOf();

        let [rows] = await this.connection.execute(`UPDATE users SET username= ?, createtime = ? ,avatar = ?, descpt = ? WHERE id = ?;`, [user.username, user.createtime, user.avatar, user.descpt, id]);
        
        // 成功 1 查数据 失败 0
        if (rows.affectedRows) {
            data = await this.getUserById(id);
        }

        return data[0];
    }

}

module.exports = new User()
