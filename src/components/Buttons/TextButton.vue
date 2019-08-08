<template>
  <div>
    <button class="btn" @click="$emit('click')" :disabled="disabled">
      <slot>Voltar</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>

.btn
  @apply rounded-full
  &:focus
    @apply outline-none
  &[disabled]
    @apply text-gray-600 cursor-not-allowed
  &:hover:not([disabled])
    @apply opacity-75

</style>
