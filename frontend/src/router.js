import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)


const page = path => () => import(`@/pages/${path}`);


const routes = [
  {
    path: '/companies',
    name: 'companies-search',
    component: page('TestPage')
  }
];


const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
