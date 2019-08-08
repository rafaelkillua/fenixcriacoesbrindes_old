<template>
  <div>
    <button :class="`btn btn_${color} btn_${size}`" @click="$emit('click')" :disabled="disabled" :loading="loading">
      <i class="fas fa-spinner spin" v-if="loading"></i>
      <slot v-else>Avançar</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    color: {
      type: String,
      required: false,
      validator: v => ['primary', 'secondary', 'error', 'default'].some(p => p === v),
      default: 'primary'
    },
    size: {
      type: String,
      required: false,
      validator: v => ['sm', 'md', 'lg'].some(p => p === v),
      default: 'md'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
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
  &_sm
    @apply w-32 h-8
  &_md
    @apply w-40 h-10 text-sm
    @screen lg
      @apply w-48 text-base
  &_lg
    @apply w-48 h-10
    @screen lg
      @apply w-72 h-12
  &[disabled]
    @apply cursor-not-allowed opacity-50
  &[loading]
    @apply cursor-wait
  &_primary
    @apply bg-primary text-white
    &:hover:not([disabled])
      @apply bg-white text-primary border-primary border-2
    &:focus:not([disabled])
      @apply outline-none
  &_secondary
    @apply bg-secondary text-white
    &:hover:not([disabled])
      @apply bg-white text-secondary border-secondary border-2
    &:focus:not([disabled])
      @apply outline-none
  &_error
    @apply bg-red-600 text-white
    &:hover:not([disabled])
      @apply bg-white text-red-600 border-red-600 border-2
    &:focus:not([disabled])
      @apply outline-none
  &_default
    @apply bg-gray-600 text-white
    &:hover:not([disabled])
      @apply bg-gray-700 text-white border-gray-700 border-2
    &:focus:not([disabled])
      @apply outline-none

.spin
  animation: spin 1s linear 0s infinite

@keyframes spin
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)

</style>
