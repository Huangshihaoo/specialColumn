/**
 * 用户相关操作
 * */
const jwt = require('jsonwebtoken');

const User = require('../../model/user');
const Column = require('../../model/column');

const controller = require('../../controller/controller');

let token;

module.exports = {
    // 注册
    async enroll(ctx) {
        // 获取表单上传用户数据
        let userData = ctx.request.body;
        // 验证email是否已注册
        let a = await User.emailExists(userData.email);
        // === 0 email没被注册 else 被注册了
        if (a.length === 0) {
            // 加个时间戳
            userData.createtime = new Date().valueOf();
            // 加描述
            userData.descpt = "一段简单的描述";
            // 加默认头像
            userData.avatar = 'images/1.jpg';
            // 加专栏名
            userData.column = `${userData.username}的专栏`;
            // 专栏id
            userData.columnid = new Date().valueOf() + 101;
            // 添加用户返回user数据
            let user = await User.addUser(userData);
            // 保存token
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000 + (60 * 60)),
                data: user
            }, 'mimi');
            // 成功放回
            controller(ctx, 1, user);

        } else {
            // 失败放回
            controller(ctx, 0, {});
        }
    },
    // 登录
    async login(ctx) {
        let user = ctx.request.body;

        let arr = await User.login(user);

        arr[0].colum = await Column.getById(arr[0].columnid)
        // === 0 登录失败 else 账号密码正确
        if (arr.length === 0) {
            // 失败放回
            controller(ctx, 0, {});
        } else {
            // 登录成功保存token
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000 + (60 * 60)),
                data: arr[0]
            }, 'mimi');
            // 成功
            controller(ctx, 1, arr);
        }
    },
    // 获取用户
    async getuser(ctx) {
        try {
            let pToken = jwt.verify(token, 'mimi');
            // 有就是没有过期，else就过期了
            if (pToken) {
                controller(ctx, 1, pToken.data);
            } else {
                // 失败放回
                controller(ctx, 0, {});
            }
        } catch (error) {
            controller(ctx, 0, {});
        }
    },
    // 更新用户
    async coveruser(ctx) {
        token = null
        // 路径上的参数id
        let userid = ctx.query.id;
        // 需要更新的数据
        let upData = ctx.request.body
        // 重置时间
        upData.createtime = new Date().valueOf();
        // 头像可能没有
        if (!upData.avatar) {
            upData.avatar = null
        }
        // 更新后的数据
        let userData = await User.updata(userid, upData);

        userData.colum = await Column.getById(userData.columnid);

        token = jwt.sign({
            exp: Math.floor(Date.now() / 1000 + (60 * 60)),
            data: userData
        }, 'mimi');
        // 有userData 就是成功
        if (userData) {
            controller(ctx, 1, userData);
        } else {
            // 失败放回
            controller(ctx, 0, {});
        }
    },
    outLogin(ctx) {
        token = null
        controller(ctx, 1, { colum: {} });
    }
}