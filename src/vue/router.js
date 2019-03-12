import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Debug from './views/Debug.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/debug',
      name: 'debug',
      // route level code-splitting
      // this generates a separate chunk (debug.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "debug" */ './views/Debug.vue')
    }
  ]
})
