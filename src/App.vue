<template>
  <div class="main_container">
    <div class="navbar_container">
      <navbar/>
    </div>
    <div class="container">
      <div v-show="!online" class="flex items-center justify-center bg-white border border-red-600 text-red-600 font-bold rounded-lg px-4 py-2 mb-4">
        Você está offline! Verifique sua conexão com a internet!
      </div>
      <p class="text-xl text-primary font-bold p-4">{{$route.meta.pageName}}</p>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      online: true
    }
  },
  mounted () {
    window.addEventListener('load', () => {
      this.online = navigator.onLine
      window.addEventListener('online', () => {
        this.online = true
      })
      window.addEventListener('offline', () => {
        this.online = false
      })
    })
  }
}
</script>

<style lang="sass">

*
  font-family: 'Montserrat', sans-serif

.main_container
  @apply w-full min-h-screen max-h-full bg-gray-100

.navbar_container
  @apply w-full flex flex-col px-12 justify-center bg-white shadow-md
  background-color: rgba(188, 71, 157, 0.1)

.container
  @apply mx-auto px-4
  @screen md
    @apply px-8
  @screen lg
    @apply px-16
  @screen xl
    @apply px-40

.pagination_page_class
  @apply h-8 w-8 border-l flex justify-center items-center cursor-pointer
  &:first-of-type
    @apply border-l-0 rounded-l-lg
  &:last-of-type
    @apply rounded-r-lg
  &:hover
    @apply bg-gray-100
    &.cursor-not-allowed
      @apply bg-transparent

</style>
