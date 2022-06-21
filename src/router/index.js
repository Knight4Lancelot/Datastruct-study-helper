import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DesignTree from '../views/DesignTreeView.vue'
import DesignLink from '../views/DesignLinkView.vue'
import MakeTree from '../views/MakeTreeView.vue'
import MakeLink from '../views/MakeLinkView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/designtree',
    name: 'designTree',
	component: DesignTree 
  },
  {
    path: '/designlink',
    name: 'designLink',
    component: DesignLink
  },
  {
    path: '/maketree',
    name: 'makeTree',
    component: MakeTree
  },
  {
    path: '/makelink',
    name: 'makeLink',
    component: MakeLink
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
