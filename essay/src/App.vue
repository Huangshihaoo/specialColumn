<template>
  <div id="app">
    <Header/>
     <router-view />
   <Footer/>
  </div>
</template>

<script>
import Header from './containers/Header';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
   created() {
       this.$store.watch((state) => {
            this.current = state.columnCurrentList 
        })
        this.getColumnList()
         if(!this.$store.state.userData.username) {
             this.$store.dispatch('autoLogin');
        }
  },
  methods: {
      getColumnList() {
          this.$store.dispatch('getColumnList',this.current);
           this.$store.state.columnCurrentList++
      }
  },
}
</script>

<style>
@import url('./assets/reset.css');
.btns {
    display: inline-block;
    height: 30px;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
}

.center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

body {
    background-color: #f2f2f2;
}

.box {
    width: 960px;
    margin: 0 auto;
}


.update {
    position: relative;
    width: 100%;
    height: 150px;
    background-color: #fff;
    font-size: 30px;
    line-height: 150px;
    text-align: center;
}

.update input {
    top: 20px;
    opacity: 0;
    width: 200px;
    height: 120px;
    background-color: #fff;
}

.head {
    margin: 0 auto;
}

.head img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.error {
    color: red;
    font-size: 12px;
}
</style>
