<template>
    <div class="form">
        <form action="">
            <h2>注册</h2>
            <div class="formitem">
                <input
                    placeholder="请输入邮箱"
                    v-vuerify="form.email"
                    v-model="form.email"
                    type="text"
                />
                <span class="error" v-if="errors['form.email']">{{
                    errors["form.email"]
                }}</span>
            </div>
            <div class="formitem">
                <input
                    placeholder="请输入昵称"
                    v-vuerify="form.username"
                    v-model="form.username"
                    type="text"
                />
                <span class="error" v-if="errors['form.username']">{{
                    errors["form.username"]
                }}</span>
            </div>
            <div class="formitem">
                <input
                    type="password"
                    v-vuerify="form.password1"
                    v-model="form.password1"
                    placeholder="请输入密码"
                />
                <span class="error" v-if="errors['form.password1']">{{
                    errors["form.password1"]
                }}</span>
            </div>
            <div class="formitem">
                <input
                    type="password"
                    v-vuerify="form.password2"
                    v-model="form.password2"
                    placeholder="重复密码"
                />
                <span class="error" v-if="errors['form.password2']">{{
                    errors["form.password2"]
                }}</span>
                <span class="error" v-if="error">两次密码不相同 </span>
            </div>
            <div class="formitem">
                <input type="button" @click="onSubmit" value="注册" />
            </div>
            <router-link to="/login" class="goto">已有帐号，去登陆</router-link>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: "",
                username: "",
                password1: "",
                password2: "",
            },
            error: false,
        };
    },
    vuerify: {
        "form.email": {
            test: /[a-z0-9A-Z]+@[a-z0-9A-Z]+\.[A-Za-z]+/,
            message: "请输入正确格式的邮箱",
        },
        "form.username": {
            test: /\w*[\u4e00-\u9fa5]*/,
            message: "允许输入字母数字下划线和中文",
        },
        "form.password1": {
            test: /\w{6,}/,
            message: "至少 6 位字符",
        },
        "form.password2": {
            test: /\w{6,}/,
            message: "至少 6 位字符",
        },
    },
    computed: {
        errors() {
            return this.$vuerify.$errors;
        },
    },
    methods: {
        async onSubmit() {
            // 判断密码是否相等
            if (this.form.password1 != this.form.password2) {
                this.error = true;
                return;
            } else {
                this.error = false;
            }

            let verifylist = [
                "form.email",
                "form.username",
                "form.password1",
                "form.password2",
            ];
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check(verifylist)) {
                return;
            }
            let data = {};
            data.email = this.form.email;
            data.username = this.form.username;
            data.password = this.form.password1;
            // let result = await enroll(data)
            // 做注册
            this.$store.dispatch("register", data);

            setTimeout(() => {
                if (this.$store.state.userData.username) {
                    setTimeout(() => {
                        this.$toast("注册成功，即将登陆", 3000);
                    }, 3000);
                    setTimeout(() => {
                        this.$router.push("/index");
                    }, 5000);
                } else {
                    this.$toast("注册失败，请稍后再试", 3000);
                }
            }, 1000);
        },
    },
};
</script>

<style>
@import url("../assets/login.css");
</style>