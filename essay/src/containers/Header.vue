<template>
    <header class="header">
        <div class="box">
            <a href="/index" class="logo">
                <h1>杂文</h1>
            </a>
            <div class="login" v-if="!this.$store.state.userData.username">
                <router-link to="/login" class="btns">登录</router-link>
                <!-- <a href="/login" class="btns">登录</a> -->
                <a href="/register" class="btns">注册</a>
            </div>
            <div class="home" v-else>
                <div class="hello" @click="show">
                    {{ this.$store.state.userData.username }}
                </div>
                <ul class="homeitem" v-if="isShow">
                    <li><a href="javascript:;" @click="toCre">新建文章</a></li>
                    <li><a href="javascript:;" @click="toArt">我的文章</a></li>
                    <li><a href="javascript:;" @click="toEdit">编辑资料</a></li>
                    <li><a href="javascript:;" @click="outLo">退出登录</a></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        show() {
            this.isShow = !this.isShow;
        },
        toCre() {
            this.isShow = !this.isShow;
            this.$router.push("/writing");
        },
        toArt() {
            this.isShow = !this.isShow;
            this.$router.push(`/colum/${this.$store.state.userData.columnid}`);
        },
        toEdit() {
            this.isShow = !this.isShow;
            this.$router.push(`/edit`);
        },
        outLo() {
            this.$store.dispatch("outLogin");
            this.$router.push(`/login`);
        },
    },
};
</script>

<style >
.header {
    width: 100%;
    height: 60px;
    background-color: #46a3fb;
}

.header .logo {
    display: inline-block;
    height: 60px;
    padding: 0 20px;
}

.header a h1 {
    line-height: 50px;
    height: 100%;
    font-size: 20px;
    color: #22ebc2;
}

.header .login {
    float: right;
    padding-top: 15px;
}

.header .home {
    position: relative;
    float: right;
}

.header .home .hello {
    position: relative;
    margin-top: 10px;
    width: 100px;
    text-align: center;
    padding: 8px 20px 8px 15px;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.header .home .hello::after {
    content: "";
    position: absolute;
    top: 15px;
    right: 8px;
    display: block;
    width: 0px;
    height: 0px;
    border: 5px solid;
    border-color: #fff transparent transparent;
}

.header .home .hello:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
}

.header .home .hello:hover::after {
    border-color: #000 transparent transparent;
}

.header .home .homeitem {
    position: absolute;
    top: 50px;
    left: 0;
    width: 150px;
    border-radius: 5px;
    padding: 5px 0;
    background-color: #fff;
    z-index: 11;
}

.header .home .homeitem li {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    cursor: pointer;
}

.header .home .homeitem li:hover {
    background-color: #f2f2f2;
}

.header .login .btns:nth-child(1) {
    margin-right: 10px;
}

.header .login .btns:hover {
    border: 1px solid #000;
    color: #000;
}
</style>