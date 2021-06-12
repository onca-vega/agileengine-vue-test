import store from '@/store'
import { TOKEN_REFERENCE } from '@/data'
import Vue from 'vue'
import VueRouter from 'vue-router'
const Images = () => import(/* webpackChunkName: "images" */ '../views/Images.vue')
const Picture = () => import(/* webpackChunkName: "image" */ '../views/Picture.vue')
const Authenticate = () => import(/* webpackChunkName: "authenticate" */ '../views/Authenticate.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authenticate',
    component: Authenticate
  },
  {
    path: '/images',
    name: 'Images',
    component: Images,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/images/:id',
    name: 'Picture',
    component: Picture,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.token) {
    const token = window.localStorage.getItem(TOKEN_REFERENCE)

    if (token) {
      store.commit('setAuthToken', token)
    }
  }

  if (to.meta.requireAuth && !store.state.token) {
    next({ name: 'Authenticate' })
  } else if (!to.meta.requireAuth && store.state.token) {
    next({ name: 'Images' })
  } else {
    next()
  }
})

export default router
