// 引入插件
import Vue from 'vue'
import Vuerify from 'vuerify'
Vue.use(Vuerify)

export default {
    data() {
        return {
            form: {
                email:'',
                username: '',
                password: ''
            }
        }
    },
    // 设置校验规则
    vuerify: {
        'form.email': {
            test: /[a-z0-9A-Z]+@[a-z0-9A-Z]+\.[A-Za-z]+/,
            message: '请输入正确格式的邮箱'
        },
        'form.username': {
            test: /\w*[\u4e00-\u9fa5]*/,
            message: '允许输入字母数字下划线和中文'
        },
        'form.password': {
            test: /\w{6,}/,
            message: '至少 6 位字符'
        }
    },
    computed: {
        // 计算属性，获取校验不通过的对象
        // 如 { "form.name": "至少 4 位字符", "form.desc": "至少 10 位字符" }
        errors() {
            return this.$vuerify.$errors
        }
    },
    methods: {
        onSubmit() {
            let verifyList = ['form.email', 'form.username'];
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check(verifyList)) {
                return;
            }
            console.log('验证通过');
        }
    }
}