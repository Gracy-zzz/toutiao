// import Vue from 'vue'
// import VueRouter from 'vue-router'
//
// Vue.use(VueRouter)
//
// const routes = []
// const router = new VueRouter({
//   routes
// })
// export default router

import { createRouter, createWebHistory } from 'vue-router'
const routes = [
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
