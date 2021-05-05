<template>
    <div class="box my">
        <div class="info">
            <div class="head">
                <img src="" v-if="!columnInfo.avatar" alt="" />
                <img
                    v-else
                    :src="`http://localhost:8080/${columnInfo.avatar}`"
                    alt=""
                />
            </div>
            <div class="synopsis">
                <h2>{{ columnInfo.author }}</h2>
                <p>{{ columnInfo.descpt }}</p>
            </div>
        </div>

        <div
            class="article"
            v-for="(item, index) in columnInfo.list.list"
            :key="index"
        >
            <h2>
                <a :href="`/articl/${item._id}`">{{ item.title }}</a>
            </h2>

            <div class="content">
                <div class="image">
                    <img v-if="!item.image" src="" alt="" />
                    <img
                        v-else
                        :src="`http://localhost:8080/${item.image}`"
                        alt=""
                    />
                </div>

                <p>{{ item.content }}</p>
            </div>
            <div class="time">{{ new Date(Number(item.createTime)) }}</div>
        </div>
        <a
            href="javascript:;"
            @click="getArticleList(articleInfo)"
            v-if="articleInfo.current <= articleInfo.maxPage"
            class="btns center"
            >加载更多</a
        >
        <a href="javascript:;" v-else class="btns center">没啦不要点啦</a>
    </div>
</template>
<script>
import { getColumnInfo, getColumnArticleList } from "../api";
export default {
    data() {
        return {
            columnInfo: {
                author: "",
                avatar: "",
                descpt: "",
                list: {},
            },
            articleInfo: {
                size: 5,
                maxPage: 2,
                id: "",
                current: 1,
            },
        };
    },
    created() {
        // 是否为登录状态
        setTimeout(() => {
            if (!this.$store.state.userData.id) {
                this.$router.push(`/login`);
            }
        }, 100);
        // 搞好信息
        this.articleInfo.id = this.$route.params.id;
        // 获取专栏
        this.getColumn();
    },
    methods: {
        async getColumn() {
            let result = await getColumnInfo(this.$route.params.id);
            this.columnInfo = result.data.data;
        },
        // 获取专栏文章列表
        async getArticleList(info) {
            console.log(info);
            let arr = await getColumnArticleList(
                info.id,
                info.current,
                info.size
            );
            let temp = [];
            if (arr.data.code === 0) {
                temp = arr.data.data.list;
                // 排序
                temp.sort((a, b) => b._id - a._id);
                // 追加文章
                this.columnInfo.list.list.push(...temp);
                // 当前请求也加一方便下次请求
                this.articleInfo.current = Number(arr.data.data.current) + 1;
                this.articleInfo.maxPage = this.columnInfo.list.maxPage;
            }
        },
    },
};
</script>
<style>
.my {
    position: relative;
    padding: 0 0 30px;
}

.info {
    overflow: hidden;
    width: 100%;
    height: 240px;
    /* background-color: #fff; */
    border-bottom: 1px solid #ced4da;
    margin-bottom: 20px;
}

.info .head {
    float: left;
    width: 200px;
    height: 200px;
    margin: 20px;
}

.info .synopsis {
    float: left;
    height: 100px;
    margin-top: 30px;
}

.info .synopsis h2 {
    font-size: 25px;
    padding: 30px 0;
}

.info .synopsis p {
    width: 480px;
    line-height: 1.5;
    color: #6c757d;
}

.article {
    border: 1px solid #ced4da;
    width: 90%;
    margin: 0 auto;
    padding: 0 20px;
    padding-bottom: 20px;
    box-shadow: 0px 1px 5px #ccc;
    margin-bottom: 20px;
}

.article h2 {
    font-size: 25px;
    padding: 15px 0;
}

.article h2 a:hover {
    color: rgb(69, 69, 248);
}

.article .content {
    overflow: hidden;
    width: 100%;
    height: 110px;
}

.article .content .image {
    float: left;
    width: 200px;
    height: 110px;
    font-size: 0;
}

.article .content .image img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.article .content p {
    float: left;
    height: 110px;
    line-height: 1.4;
    width: calc(100% - 240px);
    margin-left: 20px;
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    color: #6c757d;
}

.time {
    margin-top: 20px;
    color: #6c757d;
}

.my .center {
    background: cornflowerblue;
}
</style>