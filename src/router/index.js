import Vue from 'vue'
import VueRouter from 'vue-router'

let Index = () => import("../views/Index.vue")
// let Index = () => import("../views/Index_backup.vue")
// let Login = () => import("../views/Login_backup.vue")
let Carousel = () => import("../views/Carousel.vue")


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index.vue',
    components: {
      default:Index
    }
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   components: {
  //     default:Login
  //   }
  // },
  {
    path: '/carousel',
    name: 'carousel',
    components: {
      default:Carousel
    }
  },
  {
    path: '*',
    name: 'Index.vue',
    components: {
      default:Index
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
