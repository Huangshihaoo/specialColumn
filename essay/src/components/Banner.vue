<template>
    <main class="main1">
        <div class="box">
            <h2 class="center">写你想写</h2>
            <a :href="goto" class="center btns">写文章</a>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        return {
            goto: "/writing",
        };
    },
    created() {
        this.$store.watch(() => {
            if (this.$store.state.userData.username) {
                this.goto = "/writing";
            } else {
                this.goto = "/login";
            }
        });
    },
};
</script>
<style >
.main1 {
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("../assets/img/banner.png");
    background-position: center center;
    background-repeat: no-repeat;
    padding-bottom: 70px;
    margin-bottom: 50px;
}

.main1 .box h2 {
    bottom: 50px;
    font-size: 26px;
}

.main1 .box .btns {
    bottom: 0;
    background-color: #46a3fb;
}
</style>