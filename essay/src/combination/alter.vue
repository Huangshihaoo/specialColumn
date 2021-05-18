
<template>
    <div class="main">
        <div class="box">
            <h2>新增文章</h2>
            <div class="add">
                <div
                    class="update"
                    :style="{
                        'background': `center center / 100% 100% no-repeat url(http://103.133.176.190:4000/${essay.image})`,
                    }"
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
                        v-model="essay.title"
                        placeholder="请输入文章标题"
                    />
                </div>
                <div class="content">
                    <span>文章内容:</span>
                    <textarea
                        v-model="essay.content"
                        placeholder="请输入文章内容"
                    ></textarea>
                </div>
                <a href="javascript:;" @click="update" class="btns">发表文章</a>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 修改文章组件
*/
import { getArticle, updateArticle } from "../api";
export default {
    data() {
        return {
            article: {},
            essay: {
                title: "",
                content: "",
                image: "",
            },
        };
    },
    async created() {
        // 获取文章信息
        let result = await getArticle(this.$route.params.id);
        if (result.data.code === 0) {
            this.article = result.data.data;
            this.essay.content = this.article.content;
            this.essay.title = this.article.title;
            this.essay.image = this.article.image;
        }
    },
    methods: {
        // 更新文章
        async update() {
            let result = await updateArticle(this.article._id, this.essay);
            // result.data.code === 0 修改成功
            if (result.data.code === 0) {

                this.$toast("文章修改成功即将跳转", 3000);

                setTimeout(() => {
                    this.$router.push(`/articl/${result.data.data._id}`);
                }, 2000);
            }
        },
        // 文件提交
        async imgSub(filename) {
            // 获取 fileInput
            let file = document.querySelector(`input[id="${filename}"]`);

            let url = await this.$imgSub(file);
            
            if (url) {
                this.essay.image = url;
            }
        },
    },
};
</script>

<style>
@import url("../assets/create.css");
</style>