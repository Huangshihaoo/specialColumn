import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuerify from 'vuerify';
import VuerifyDirective from 'v-vuerify-next'; // Vue2.0
import toastRegistry from './utils/toast/index';
import store from './store';
import subimg from './utils/imgsub';

Vue.use(subimg);

Vue.use(toastRegistry);

Vue.use(Vuerify,{});
Vue.use(VuerifyDirective);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
