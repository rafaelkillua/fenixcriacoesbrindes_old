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
      component: Dashboard,
      meta: {
        pageName: 'Painel'
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      meta: {
        pageName: 'Clientes'
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        pageName: 'Ordens de Serviço'
      }
    },
    {
      path: '/new-order',
      name: 'new-order',
      component: NewOrder,
      meta: {
        pageName: 'Nova Ordem de Serviço'
      }
    }
  ]
})
