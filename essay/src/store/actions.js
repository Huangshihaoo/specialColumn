import {
    RECEPTION_COLUMN_LIST,
    RECEPTION_USER_DATA,
    RECEPTION_LIST_SIZE,
    RECEPTION_LOGIN,
    RECEPTION_USER_UPDATE,
    RECEPTION_RESET
} from "./mutationTypes";

import {
    enroll,
    getColumn,
    login,
    autoLogin,
    updateInfo,
    updateColumn,
    outLogi,
} from '../api';

export default {
    async register(context, payload) {
        const result = await enroll(payload);
        if (result.data.code === 0) {
            const userData = result.data.data
            
            context.commit(RECEPTION_USER_DATA, { userData })
        }
    },
    async getColumnList(context, payload) {
        const result = await getColumn(payload);
        if (result.data.code === 0) {
            // console.log( result.data.data);
            context.commit(RECEPTION_LIST_SIZE, result.data.data.pageSize)
            const column = result.data.data.list
            context.commit(RECEPTION_COLUMN_LIST, { column })
        }
    },
    async login(context, payload) {
        const result = await login(payload);
        if (result.data.code === 0) {
            context.commit(RECEPTION_LOGIN, result.data.data[0])
        }
    },
    async autoLogin(context, payload) {
        const result = await autoLogin(payload);
        if (result.data.code === 0) {
            context.commit(RECEPTION_LOGIN, result.data.data)
        }
    },
    async updateInfo(context, payload) {
        const result = await updateInfo(payload.id, payload.user)
        if (result.data.code === 0) {
            context.commit(RECEPTION_USER_UPDATE, result.data.data)
        }
    },
    async updateColum(context, payload) {
        await updateColumn(payload.id, payload.column)
    },
    async outLogin(context,payload) {
        const result = await outLogi(payload);
        if (result.data.code === 0) {
            context.commit(RECEPTION_RESET, result.data.data);
        }
    }
} 