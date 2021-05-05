<template>
    <div>
        <Banner />
        <router-view />
        <Find />
    </div>
</template>

<script>
import Banner from "../components/Banner";
import Find from "../containers/Find";
export default {
    name: "Index",
    components: {
        Banner,
        Find,
    },
    data() {
        return {
            current: 1,
        };
    },

    methods: {
        getColumnList() {
            this.$store.dispatch("getColumnList", this.current);
            this.$store.state.columnCurrentList++;
            this.current++;
        },
    },
};
</script>

<style>
</style>