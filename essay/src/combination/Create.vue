<template>
    <div class="main">
        <div class="box">
            <h2>新增文章</h2>
            <div class="add">
                <div
                    class="update"
                    :style="{ 'background-image': `url(${img})` }"
                >
                    <span class="center"> 上传封面 </span>
                    <input
                        class="sub"
                        type="submit"
                        @click="imgSub('img')"
                        value="提交"
                    />
                    <input
                        type="file"
                        class="center"
                        id="img"
                        name="img"
                        value="上传封面"
                    />
                </div>

                <div class="title">
                    <span>文章标题:</span>
                    <input
                        type="text"
                        v-model="title"
                        placeholder="请输入文章标题"
                    />
                </div>
                <div class="content">
                    <span>文章内容:</span>
                    <textarea
                        v-model="content"
                        placeholder="请输入文章内容"
                    ></textarea>
                </div>
                <a href="javascript:;" @click="refer" class="btns">发表文章</a>
            </div>
        </div>
    </div>
</template>

<script>
// 发布文章
import { createAre } from "../api";
export default {
    data() {
        return {
            img: "images/16191773534821.jpg",
            title: "",
            content: "",
        };
    },
    created() {
        // 是否为登录状态
        setTimeout(()=>{
            if (!this.$store.state.userData.id) {
                this.$router.push(`/login`);
            }
        },100)
    },
    methods: {
        async imgSub(filename) {
            // 获取 fileInput
            let file = document.querySelector(`input[id="${filename}"]`);
            let url = await this.$imgSub(file);
            if (url) {
                this.img = url;
            }
        },
        async refer() {
            let article = {};
            // 添加文章信息
            article.title = this.title;
            article.url = this.img;
            article.content = this.content;
            article.author = this.$store.state.userData.id;
            article.columnid = this.$store.state.userData.columnid;
            // 发布文章
            let result = await createAre(article);

            let { data } = result.data;

            if (result.data.code === 0) {

                this.$toast("文章发布成功即将跳转", 3000);

                setTimeout(() => {
                    this.$router.push(`/articl/${data._id}`);
                }, 2000);
            }
        },
    },
};
</script>
<style>
@import url("../assets/create.css");
</style>