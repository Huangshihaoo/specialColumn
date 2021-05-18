import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuerify from 'vuerify';
import VuerifyDirective from 'v-vuerify-next'; // Vue2.0
import toastRegistry from './utils/toast/index';
import store from './store';
import subimg from './utils/imgsub';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.$cookies.config('3d');

Vue.use(subimg);

Vue.use(toastRegistry);

Vue.use(Vuerify,null);
Vue.use(VuerifyDirective);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
