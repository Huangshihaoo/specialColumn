<template>
    <div>
        <main class="main1">
            <div class="box">
                <h2 class="center">写你想写</h2>
                <a :href="goto" class="center btns">写文章</a>
            </div>
        </main>

        <div>
            <div class="find">
                <h2>发现精彩</h2>
                <div class="row">
                    <div
                        class="item"
                        v-for="(item, index) in columnList"
                        :key="index"
                    >
                        <div class="head">
                            <img :src="`http://localhost:4000/${item.avatar}`" alt="" />
                        </div>
                        <div class="name">
                            <span>{{ item.author }}</span>
                        </div>
                        <div class="info">
                            <p>{{ item.descpt }}</p>
                        </div>
                        <div class="btn">
                            <a :href="`/colum/${item.columnid}`" class="btns"
                                >进入主页</a
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!-- jiazai -->
            <div class="load">
                <a
                    href="javascript:;"
                    @click="load"
                    v-if="columnCurrent < columnSum"
                    class="center btns"
                    >加载更多</a
                >
                <a href="javascript:;" class="center btns" v-else>没有更多了</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",

    data() {
        return {
            goto: "/writing",
            current: 1,
            columnList: [],
            columnCurrent: this.$store.state.columnCurrentList,
            columnSum: this.$store.state.columnListSize,
        };
    },
    created() {
        this.$store.watch((state) => {
            this.columnList = state.columnList;
            this.columnCurrent = state.columnCurrentList;
            this.columnSum = state.columnListSize;
        });
        this.$store.watch(() => {
            if (this.$store.state.userData.username) {
                this.goto = "/writing";
            } else {
                this.goto = "/login";
            }
        });
    },
    methods: {
        getColumnList() {
            this.$store.dispatch("getColumnList", this.current);
            this.$store.state.columnCurrentList++;
            this.current++;
        },
        load() {
            this.$parent.getColumnList();
        },
    },
};
</script>

<style>
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

.find {
    padding: 0 100px;
}

.find h2 {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 30px;
}

.find .row {
    /* height: 550px; */
    margin-bottom: 40px;
    overflow: hidden;
}

.find .row .item {
    position: relative;
    float: left;
    width: 270px;
    margin: 0 20px;
    margin-bottom: 30px;
    padding: 30px 20px 20px;
    background-color: #fff;
    box-shadow: 0px 2px 5px #acaaaa;
    border-radius: 3px;
}

.find .row .item .head {
    width: 50px;
    height: 50px;
}

.find .row .item .name {
    margin: 15px 0;
    font-size: 20px;
    text-align: center;
}

.find .row .item .info {
    margin-bottom: 30px;
    height: auto;
}

.find .row .item .info p {
    height: 58px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #6c757d;
}

.find .row .item .btn {
    text-align: center;
}

.find .row .item .btn .btns,
.load .btns {
    border: 1px solid #46a3fb;
    color: #46a3fb;
}

.find .row .item .btn .btns:hover,
.load .btns:hover {
    border: 1px solid #fff;
    background-color: #46a3fb;
    color: #fff;
}

.load {
    position: relative;
    height: 40px;
}

.load .btns {
    border: 2px solid #46a3fb;
    text-align: center;
    width: 120px;
    height: 40px;
    line-height: 1.7;
}
</style>