import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Clients from '@/views/Clients/Clients'
import Orders from '@/views/Orders/Orders'
import NewOrder from '@/views/Orders/NewOrder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/new-order',
      name: 'new-order',
      component: NewOrder
    }
  ]
})
