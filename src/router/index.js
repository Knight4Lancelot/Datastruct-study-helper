import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DesignTree from '../views/DesignViews/DesignTreeView.vue';
import DesignLink from '../views/DesignViews/DesignLinkView.vue';
import DesignGraph from '../views/DesignViews/DesignGraphView.vue';
import PopSort from '../views/AlgorithmViews/PopSortView.vue';
import InsertASort from '../views/AlgorithmViews/InsertASortView.vue';
import TestPage from '../views/testPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/test',
    name: 'test',
    component: TestPage
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/design/tree',
    name: 'designTree',
	component: DesignTree 
  },
  {
    path: '/design/link',
    name: 'designLink',
    component: DesignLink
  },
  {
    path: '/design/graph',
    name: 'designGraph',
    component: DesignGraph
  },
  {
    path: '/algorithm/popsort',
    name: 'popSort',
    component: PopSort
  },
  {
    path: '/algorithm/insertAsort',
    name: 'insertASort',
    component: InsertASort
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
