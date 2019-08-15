<template>
  <div class="main">
    <div class="flex justify-between items-center mx-4 my-1">
      <v-input class="w-1/2" name="pesquisa" v-model="search" label="Pesquisar ordem de serviço"/>
      <v-button @click="showModal = true" link="/new-order"><i class="fas fa-plus mr-2"></i>Nova OS</v-button>
    </div>
    <vuetable
      ref="vuetable"
      class="orders"
      :fields="header"
      :api-mode="false"
      :data-manager="dataManager"
      :no-data-template="loading ? '' : search.length ? 'Não encontrado' : 'Sem dados'"
    >
    </vuetable>
    <div class="flex justify-end">
      <vuetable-pagination
        ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
        :css="paginationCss"
      ></vuetable-pagination>
    </div>
    <div v-if="loading" class="w-full flex flex-col justify-center items-center mt-4">
      <span class="fa fa-spinner fa-spin text-2xl text-secondary"></span>
    </div>
  </div>
</template>

<script>
import Vuetable, { VuetablePagination } from 'vuetable-2'
import VButton from '@/components/Buttons/Button'
import VInput from '@/components/Inputs/Input'

import Orders from '@/services/Orders'

export default {
  name: 'orders',
  components: { Vuetable, VuetablePagination, VButton, VInput },
  data: () => ({
    loading: false,
    showModal: false,
    search: '',

    orders: [],
    pagination: {
      current_page: 0,
      last_page: 0,
      per_page: 10,
      total: 0
    },
    header: [
      {
        name: 'name',
        title: 'Nome'
      },
      {
        name: 'email',
        title: 'E-mail'
      },
      {
        name: 'phone',
        title: 'Telefone'
      },
      {
        name: 'address',
        title: 'Endereço'
      }
    ],
    paginationCss: {
      wrapperClass: 'border rounded-lg flex m-2 text-secondary',
      activeClass: 'text-primary shadow-inner bg-gray-100 font-bold',
      disabledClass: 'text-gray-300 cursor-not-allowed',
      pageClass: 'pagination_page_class',
      linkClass: 'pagination_page_class',
      icons: {
        first: 'fas fa-angle-double-left',
        prev: 'fas fa-angle-left',
        next: 'fas fa-angle-right',
        last: 'fas fa-angle-double-right'
      }
    }
  }),
  methods: {
    onChangePage (page) {
      let reload = false
      switch (true) {
        case page === 'next':
          if (!this.$refs.pagination.isOnLastPage) {
            this.pagination.current_page = this.pagination.current_page + 1
            reload = true
          }
          break
        case page === 'prev':
          if (!this.$refs.pagination.isOnFirstPage) {
            this.pagination.current_page = this.pagination.current_page - 1
            reload = true
          }
          break
        default:
          if (this.pagination.current_page !== page) {
            this.pagination.current_page = page
            reload = true
          }
          break
      }
      if (reload) {
        this.$refs.vuetable.reload()
      }
    },
    dataManager (sortOrder, pagination) {
      if (this.orders.length < 1) return
      return {
        pagination: this.pagination,
        data: this.orders.filter(d => d && d.name && d.name.toLowerCase().includes(this.search.toLowerCase()))
      }
    },
    async loadOrders () {
      try {
        this.loading = true
        this.$refs.vuetable.resetData()
        this.orders = await Orders.getOrders()
        this.pagination = {
          current_page: 1,
          last_page: Math.ceil(this.orders.length / this.pagination.per_page),
          total: this.orders.length,
          per_page: this.pagination.per_page
        }
        this.$refs.vuetable.reload()
        this.$refs.pagination.setPaginationData(this.pagination)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    search () {
      this.$refs.vuetable.reload()
    }
  },
  mounted () {
    this.loadOrders()
  }
}
</script>

<style lang="sass" scoped>

.main
  @apply w-full h-full border rounded-lg bg-white h-120

</style>

<style lang="sass">

.orders
  @apply w-full text-sm
  thead tr th
    @apply p-4 text-xs text-gray-600
    background: #ECECEC
  tr
    @apply border-b border-gray-300
  td
    @apply p-4 text-gray-600 text-center whitespace-normal
    &:first-child
      @apply w-104 pl-2

</style>
