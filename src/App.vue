<template>
  <div id="app">
    <div class="w-full flex flex-col px-6 justify-center bg-white shadow-md mb-4">
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

.container
  @apply mx-auto px-4
  @screen md
    @apply px-8
  @screen lg
    @apply px-16
  @screen xl
    @apply px-40

</style>
