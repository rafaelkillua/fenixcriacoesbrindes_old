<template>
  <div class="navbar">
    <transition name="fade">
      <modal-nav v-show="modalnav" @closeModal="modalnav = false">
        <div slot="body" class="flex flex-col items-center mt-4">
          <!-- <img class="avatar" :src="$store.state.investor.avatar">
            <div class="badge" v-show="unreadMessages > 0" @click="$router.push('/investidor/mensagens')">{{unreadMessages}}</div>
          <p class="font-bold my-2 text-sm uppercase">{{$store.state.investor.name}}</p>
          <p class="user_money">{{$store.state.investor.balance | money}}</p>
          <div class="flex justify-center items-center mt-4">
            <div class="money_bag_red" @click="modalWithdrawal = true"/>
            <div class="money_bag_green" @click="modalDeposit = true"/>
          </div>
          <hr class="h-px w-full bg-black opacity-25 mt-4">
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/painel')">Início</p>
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/carteira')">Carteira</p>
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/meus-investimentos')">Meus Investimentos</p>
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/mensagens')">Mensagens</p>
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/relatorios')">Relatórios</p>
          <p class="link_dashboard" @click="modalnav = false; $router.push('/investidor/perfil')">Perfil</p>
          <p class="link_dashboard" @click="$emit('logout')">Sair</p> -->
        </div>
      </modal-nav>
    </transition>
    <header>
      <router-link class="logo_link" to="/">
        <img class="logo" src="@/assets/images/fenix.png" alt="Fenix">
      </router-link>
      <img @click="modalnav = true" class="bars" src="@/assets/images/menu.svg" alt="">
      <nav>
        <div class="flex justify-center items-center">
          <router-link class="link" to="/clients">Clientes</router-link>
          <router-link class="link" to="/orders">Pedidos</router-link>
          <!-- <router-link class="link" to="/">Relatórios</router-link> -->
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import ModalNav from '@/components/Modal/ModalNav'

export default {
  name: 'investor-navbar',
  components: { ModalNav },
  data () {
    return {
      modalnav: false
    }
  }
}
</script>

<style lang="sass" scoped>

.navbar
  @apply w-full py-2 flex justify-center z-40
  @screen md
    @apply items-center

header
  @apply h-16 w-full flex flex-row items-center justify-between

.logo
  @apply h-12
  @screen lg
    @apply h-14
  &_link
    @apply cursor-pointer

nav
  @apply hidden
  @screen md
    @apply block flex items-center
  @screen lg
    @apply block flex items-center

.avatar
  @apply h-14 w-14 shadow rounded-full
  @screen md
    @apply mr-4

.link
  @apply uppercase ml-4 opacity-75 appearance-none text-secondary
  &:hover
    @apply opacity-50
  &.router-link-exact-active
    @apply font-bold border-b border-secondary

.bars
  @apply block w-6 h-6
  @screen md
    @apply hidden
  @screen lg
    @apply hidden
</style>
