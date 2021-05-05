import {RECEPTION_GET_USER_TOKEN,
    RECEPTION_USER_DATA,
    RECEPTION_COLUMN_LIST,
    RECEPTION_LIST_SIZE,
    RECEPTION_LOGIN,
    RECEPTION_USER_UPDATE,
    RECEPTION_COLUMN_UPDATE,
    RECEPTION_RESET,
} from './mutationTypes';
export default {
    [RECEPTION_GET_USER_TOKEN](state,{getUserToken}){
        state.getUserToken = getUserToken
    },
    [RECEPTION_USER_DATA](state,payload){
        state.userData = payload.userData
    },
    [RECEPTION_COLUMN_LIST](state,payload) {
        state.columnList.push(...payload.column) 
    },
    [RECEPTION_LIST_SIZE](state,payload) {
        state.columnListSize = payload
    },
    [RECEPTION_LOGIN](state,payload){
        state.userData = payload
    },
    [RECEPTION_USER_UPDATE](state,payload) {
        state.userData = payload
        state.userData.colum = payload.colum
    },
    [RECEPTION_COLUMN_UPDATE](state,payload) {
        state.userData.colum = payload
    },
    [RECEPTION_RESET](state,payload) {
        state.userData = payload
    }
   
}