<template>
  <div class="main">
    Nova OS
  </div>
</template>

<script>
import VButton from '@/components/Buttons/Button'
import VInput from '@/components/Inputs/Input'

// import Orders from '@/services/Orders'

export default {
  name: 'new-order',
  components: { VButton, VInput },
  data: () => ({
    loading: false
  }),
  methods: {

  }
}
</script>

<style lang="sass" scoped>

.main
  @apply w-full h-full border rounded-lg bg-white h-120

</style>
