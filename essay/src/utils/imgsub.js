import {upLoadImg} from '../api'
export default {
    install(Vue) {
        Vue.prototype.$imgSub = async (file) => {
            if (!file.files[0]) {
                return;
            }
            let formData = new window.FormData();
            formData.append("file", file.files[0]);
            let result = await upLoadImg(formData);
            return result.data.data.url.substr(7);
        }
    }
}