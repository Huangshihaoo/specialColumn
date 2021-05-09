/**
 * api集中区
*/

import axios from 'axios';

// 注册
export const enroll = async data => await axios.post('http://localhost:4000/user/enroll', data);

// 获取专栏列表
export const getColumn = async current => await axios.get(`http://localhost:4000/column?current=${current}&size=6`);

// 登录
export const login = async userData => await axios.post(`http://localhost:4000/user/login`, userData);

// 自动登录
export const autoLogin = async () => await axios.get(`http://localhost:4000/user/getuser`);

// 获取专栏数据
export const getColumnInfo = async id => await axios.get(`http://localhost:4000/column/col/${id}`);

// 上传图片
export const upLoadImg = async function (formData) {
    return await axios.post('http://localhost:4000/file/updata', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// create文章
export const createAre = async article => await axios.post('http://localhost:4000/article/create', article);

// 获取文章
export const getArticle = async id => await axios.get(`http://localhost:4000/article/${id}`);

// 更新用户信息
export const updateInfo = async (id, data) => await axios.patch(`http://localhost:4000/user/coveruser?id=${id}`, data);

// 更新专栏信息
export const updateColumn = async (id, data) => await axios.patch(`http://localhost:4000/column/${id}`, data);

// 退出登录
export const outLogi = async () => await axios.get('http://localhost:4000/user/outlogin');

// 修改文章
export const updateArticle = async (id, data) => await axios.patch(`http://localhost:4000/article/${id}`, data);

// 删除文章
export const deleteArticle = async (id) => await axios.delete(`http://localhost:4000/article/${id}`);

// 获取专栏文章
export const getColumnArticleList = async (id, current, size) => await axios.get(`http://localhost:4000/column/articl?id=${id}&current=${current}&size=${size}`);