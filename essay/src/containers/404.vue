<template>
    <div class="err">
        <h2>Not Found <span>页面不存在</span></h2>
        <p><a href="/index">点击跳转首页</a></p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .err {
        width: 100%;
        height: calc(100vh - 170px);
        text-align: center;
    }
    .err h2 {
        height: 200px;
        line-height: 200px;
        font-size: 50px;
    }
    .err h2 span {
        font-size: 16px;
    }
     .err p a {
         color: blue;
     }
</style>