import Vue from 'vue'
import VueRouter from 'vue-router'

import Index  from './combination/index.vue';
import Login  from './combination/Login.vue'; 
import Register  from './combination/Enroll.vue'; 
import My  from './combination/My.vue'; 
import Writing  from './combination/Create.vue'; 
import Article from './combination/article.vue';
import Edit from './combination/Edit.vue';
import Alter from './combination/alter.vue';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }

      const VueRouterReplace = VueRouter.prototype.replace
      VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}


export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect:'/index',
        },
        {  
            path:'/colum/:id',
            component: My
        },
        {
            path:'/writing',
            component: Writing
        },
        {
            path:'/articl/:id',
            component: Article
        },
        {
            path:'/index',
            component:Index
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component: Register
        },
        {
            path:'/edit',
            component: Edit
        },
        {
            path:'/alter/:id',
            component: Alter
        }
    ]
})