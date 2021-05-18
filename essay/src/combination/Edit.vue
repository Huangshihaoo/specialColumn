<template>
    <div class="box edit">
        <ul class="tab">
            <li :class="{ active: !hide }" @click="isHide(true)">
                <a href="javascript:;">更新个人资料</a>
            </li>
            <li :class="{ active: hide }" @click="isHide(false)">
                <a href="javascript:;">更新专栏资料</a>
            </li>
        </ul>
        <div class="personage" v-show="hide">
            <h2>编辑个人资料</h2>
            <div class="update">
                <span class="center" v-if="!user.avatar"> 上传头像 </span>
                <span
                    class="center"
                    v-else
                    :style="{ 'background': `center center / 100% 100% no-repeat url(http://103.133.176.190:4000/${user.avatar})` }"
                >
                    上传头像
                </span>
                <input
                    type="file"
                    class="center"
                    name="img"
                    id="f1"
                    value="上传封面"
                />
                <button @click="imgSub('f1', 'f1')">上传</button>
            </div>
            <div class="name">
                <input
                    type="text"
                    v-vuerify="user.username"
                    v-model="user.username"
                    placeholder="输入新用户名"
                />
                <span class="error" v-if="errors['user.username']">{{
                    errors["user.username"]
                }}</span>
            </div>
            <div class="synopsis">
                <textarea
                    v-vuerify="user.descpt"
                    v-model="user.descpt"
                    cols="30"
                    rows="10"
                    placeholder="输入新的简介"
                ></textarea>
                <span class="error" v-if="errors['user.descpt']">{{
                    errors["user.descpt"]
                }}</span>
            </div>
            <a href="javascript:;" @click="userUpdate" class="btns">更新简介</a>
        </div>
        <div class="column" v-show="!hide">
            <h2>编辑专栏资料</h2>
            <div class="update">
                <span class="center" v-if="!column.avatar"> 上传专栏图 </span>
                <span
                    class="center"
                    v-else
                    :style="{'background': `center center / 100% 100% no-repeat url(http://103.133.176.190:4000/${column.avatar})` }"
                >
                    上传专栏图
                </span>
                <input
                    type="file"
                    class="center"
                    id="f2"
                    name="img"
                    value="上传封面"
                />
                <button @click="imgSub('f2', 'f2')">上传</button>
            </div>
            <div class="name">
                <input
                    v-vuerify="column.title"
                    v-model="column.title"
                    type="text"
                    placeholder="输入新专栏名"
                />
                <span class="error" v-if="errors['column.title']">{{
                    errors["column.title"]
                }}</span>
            </div>
            <div class="synopsis">
                <textarea
                    v-vuerify="column.descpt"
                    v-model="column.descpt"
                    placeholder="输入新的专栏简介"
                ></textarea>
                <span class="error" v-if="errors['column.descpt']">{{
                    errors["column.descpt"]
                }}</span>
            </div>
            <button @click="columnUpdate" class="btns">更新简介</button>
        </div>
    </div>
</template>

<script>
// 编辑简介
export default {
    data() {
        return {
            userId: this.$store.state.userData.id,
            columnId: this.$store.state.userData.colum._id,
            hide: true,
            user: {
                avatar: "",
                username: "",
                descpt: "",
            },
            column: {
                avatar: "",
                title: "",
                descpt: "",
            },
        };
    },
    vuerify: {
        "user.username": {
            test: /^[^\s]+[\s]*.*$/,
            message: "不能为空",
        },
        "user.descpt": {
            test: /^[^\s]+[\s]*.*$/,
            message: "不能为空",
        },
        "column.descpt": {
            test: /^[^\s]+[\s]*.*$/,
            message: "不能为空",
        },
        "column.title": {
            test: /^[^\s]+[\s]*.*$/,
            message: "不能为空",
        },
    },
    created() {
        this.$store.watch((state) => {
            this.userId = state.userData.id
            // 获取用户及专栏信息
            this.user.avatar = state.userData.avatar;
            this.user.username = state.userData.username;
            this.user.descpt = state.userData.descpt;

            let col = state.userData.colum;
            this.column.avatar = col.avatar;
            this.column.title = col.title;
            this.column.descpt = col.descpt;
        });
    },
    methods: {
        // 显示那个编辑状态
        isHide(val) {
            this.hide = val;
        },
        // 用户信息修改
        userUpdate() {
            let verifylist = ["user.username", "user.descpt"];
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check(verifylist)) {
                return;
            }
            if (
                this.user.avatar === this.$store.state.userData.avatar &&
                this.user.username === this.$store.state.userData.username &&
                this.user.descpt === this.$store.state.userData.descpt
            ) {
                this.$toast("没有信息更改", 3000);
                return;
            }

            this.$store.dispatch("updateInfo", {
                id: this.userId,
                user: this.user,
            });
            
            this.$store.watch(() => {
                this.$toast("更改完成", 3000);
                this.$router.push("/edit");
            });
        },
        columnUpdate() {
            let verifylist = ["column.title", "column.descpt"];
            // check() 校验所有规则，参数可以设置需要校验的数组
            if (!this.$vuerify.check(verifylist)) {
                return;
            }
            if (
                this.column.avatar ===
                    this.$store.state.userData.colum.avatar &&
                this.column.title === this.$store.state.userData.colum.title &&
                this.column.descpt === this.$store.state.userData.colum.descpt
            ) {
                this.$toast("没有信息更改", 3000);
                return;
            }
            this.$store.dispatch("updateColum", {
                id: this.columnId,
                column: this.column,
            });
            this.$store.watch(() => {
                this.$toast("更改完成,重新登录查看", 3000);
                this.$store.dispatch("outLogin");
                this.$router.push("/login");
            });
        },
        // 两个图片上传合一
        async imgSub(aa, filename) {
            let file = document.querySelector(`input[id="${filename}"]`);
            let url = await this.$imgSub(file);
            if (aa === "f1") {
                if (url) {
                    this.user.avatar = url;
                }
                return;
            } else {
                if (url) {
                    this.column.avatar = url;
                }
                return;
            }
        },
    },
    computed: {
        errors() {
            return this.$vuerify.$errors;
        },
    },
};
</script>
<style>
.none {
    display: none;
}
.edit {
    width: 700px;
    padding-top: 30px;
}

.edit .tab {
    overflow: hidden;
    border-bottom: 1px solid #ced4da;
}

.edit .tab li {
    float: left;
    padding: 8px 10px;
    text-align: center;
    border: 0.5px solid #ced4da;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: none;
}

.edit .tab .active {
    border: 0.5px solid transparent;
    border-bottom: none;
    transition: all 0.2s;
}

.edit .tab .active:hover {
    color: blue;
    border: 0.5px solid #ced4da;
    border-bottom: none;
    box-sizing: border-box;
}

.edit .personage h2,
.edit .column h2 {
    font-size: 22px;
    margin: 20px 0;
}

.edit .personage .update,
.edit .column .update {
    position: relative;
    padding: 10px 0;
}

.edit .personage .update button,
.edit .column .update button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 60px;
    height: 30px;
    background: #46a3fb;
    color: #fff;
    z-index: 10;
}

.edit .personage .update .center,
.edit .column .update .center {
    background-color: #ced4da;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    /* background-image: url('../assets/img/head.jpg'); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fff;
}

.edit .personage .name,
.edit .column .name,
.edit .personage .synopsis,
.edit .column .synopsis {
    margin-top: 30px;
}

.edit .personage .name input,
.edit .column .name input,
.edit .personage .synopsis textarea,
.edit .column .synopsis textarea {
    width: 100%;
    height: 30px;
    border: 1px solid #ced4da;
    border-radius: 3px;
    padding-left: 10px;
    box-sizing: border-box;
}

.edit .personage .synopsis textarea,
.edit .column .synopsis textarea {
    padding: 5px 10px 0;
    height: 180px;
    resize: vertical;
}

.edit .personage .btns,
.edit .column .btns {
    color: #fff;
    background-color: #46a3fb;
    border: 1px solid #46a3fb;
    margin-top: 20px;
}
</style>