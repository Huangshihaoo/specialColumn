<template>
    <article class="box">
        <div class="atitle">
            <a href="/index">首页</a> /
            <a :href="`/colum/${article.author.columnid}`">专栏首页</a> /
            <span>{{ article.title }}</span>
            <span class="right" v-if="alter">
                <a href="javascritp:;" class="btns" @click="delet">删除</a>
                <a href="javascript:;" class="btns" @click="toAlter"
                    >修改</a
                ></span
            >
        </div>
        <div class="img">
            <img
                class="cover"
                :src="`http://localhost:4000/${article.image}`"
                alt=""
            />
        </div>
        <h2 class="t">{{ article.title }}</h2>
        <div class="author">
            <div class="head">
                <img
                    :src="`http://localhost:4000/${article.author.avatar}`"
                    alt=""
                />
            </div>
            <div class="authorinfo">
                <p class="name">{{ article.author.username }}</p>
                <p class="miaoshu">{{ article.author.descpt }}</p>
            </div>
            <div class="time">
                <p>发表时间</p>
                {{ Date("Y-m-d H:i:s", article.createTime) }}
            </div>
        </div>
        <div class="content1">
            {{ article.content }}
        </div>
    </article>
</template>

<script>
/**
 * 文章查看组件
 */
import { getArticle, deleteArticle } from "../api";
export default {
    data() {
        return {
            colId: "", // 专栏id
            alter: false, // 是否显示编辑按钮
            article: {
                author: {
                    avatar: "",
                },
                image: "",
            },
        };
    },
    async created() {
        // state数据监控 实时获取专栏id
        this.$store.watch((state) => {
            this.colId = state.userData.columnid;
        });
        // 获取文章
        let result = await getArticle(this.$route.params.id);

        if (result.data.code === 0) {
            this.article = result.data.data;

            if (this.article.columnid === this.colId) {
                this.alter = true;
            }
        }
    },
    methods: {
        // 去往文章修改组件
        toAlter() {
            this.$router.push(`/alter/${this.article._id}`);
        },
        // 删除文章
        async delet() {
            // 删除文章
            let result = await deleteArticle(this.article._id);

            if (result.data.code === 0) {
                this.$toast("文章删除成功即将跳转", 3000);

                setTimeout(() => {
                    this.$router.push(`/colum/${this.article.columnid}`);
                }, 2000);
            }
        },
    },
};
</script>

<style>
.box {
    width: 800px;
}

.box .atitle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 20px 0;
    border-radius: 6px;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fff;
}

.box .atitle > a {
    color: dodgerblue;
}

.box .img {
    width: 100%;
    height: 300px;
    margin: 10px 0;
    border-radius: 10px;
    overflow: hidden;
}

.box .img .cover {
    width: 100%;
    height: 100%;
}

.box .t {
    width: 100%;
    font-size: 30px;
    margin: 40px 0;
}
.box .right {
    float: right;
    margin-right: 20px;
}

.box .right a {
    line-height: 17px;
    background: royalblue;
}

.box .right :nth-child(1) {
    background: salmon;
}

.box .author {
    overflow: hidden;
    height: 100px;
    width: 100%;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
}

.box .author .head {
    width: 80px;
    height: 80px;
    float: left;
    margin: 10px;
}

.box .author .authorinfo {
    float: left;
    width: 400px;
}

.box .author .authorinfo .name {
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
}

.box .author .authorinfo .miaoshu {
    color: gray;
}

.box .author .time {
    float: right;
    margin-top: 10px;
    line-height: 1.5;
    width: 300px;
    /* font-style: oblique; */
}
.box > .content1 {
    margin-top: 50px;
    line-height: 2;
}
</style>
