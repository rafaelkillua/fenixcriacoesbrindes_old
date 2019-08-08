<template>
  <div class="main_container">
    <div class="navbar_container">
      <navbar/>
    </div>
    <div class="container">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'

export default {
  components: { Navbar }
}
</script>

<style lang="sass">

*
  font-family: 'Montserrat', sans-serif

.main_container
  @apply w-full min-h-screen max-h-full bg-gray-100

.navbar_container
  @apply w-full flex flex-col px-6 justify-center bg-white shadow-md mb-4
  background-color: rgba(188, 71, 157, 0.1)

.container
  @apply mx-auto px-4
  @screen md
    @apply px-8
  @screen lg
    @apply px-16
  @screen xl
    @apply px-40

</style>
