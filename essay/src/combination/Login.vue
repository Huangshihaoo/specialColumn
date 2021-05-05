<template>
    <div class="form">
        <form action="">
            <h2>登录</h2>
            <div class="formitem">
                <input
                    v-vuerify="user.email"
                    v-model="user.email"
                    placeholder="请输入邮箱"
                    type="text"
                />
                <span class="error" v-if="errors['user.email']">{{
                    errors["user.email"]
                }}</span>
            </div>
            <div class="formitem">
                <input
                    type="password"
                    v-model="user.password"
                    v-vuerify="user.password"
                    placeholder="请输入密码"
                />
                <span class="error" v-if="errors['user.password']">{{
                    errors["user.password"]
                }}</span>
            </div>
            <div class="formitem">
                <input type="button" @click="login" value="登录" />
            </div>
            <router-link to="/register" class="goto">注册新用户</router-link>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
        };
    },
    vuerify: {
        "user.email": {
            test: /[a-z0-9A-Z]+@[a-z0-9A-Z]+\.[A-Za-z]+/,
            message: "请输入正确格式的邮箱",
        },
        "user.password": {
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
        login() {
            let verifylist = ["user.email", "user.password"];

            if (!this.$vuerify.check(verifylist)) {
                return;
            }
            // 登录
            this.$store.dispatch("login", this.user);

            this.$store.watch((state) => {
                setTimeout(() => {
                    // 判断是否登录成功
                    if (state.userData.username) {
                        this.$toast("登陆成功", 3000);

                        setTimeout(() => {
                            this.$router.push("/index");
                        }, 3000);
                    } else {
                        this.$toast("登陆失败，请稍后再试", 3000);
                    }
                }, 1000);
            });
        },
    },
};
</script>

<style>
@import url("../assets/login.css");
</style>