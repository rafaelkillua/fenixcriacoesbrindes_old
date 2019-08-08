<template>
  <div>
    <input
      :id="`${name}_radio_${String(value)}`"
      :name="name"
      class="radio"
      type="radio"
      :checked="state"
      :value="value"
      :disabled="disabled"
      @change="v => $emit('input', value)"
      @click="v => $emit('click')"
    >
    <label
      class="label"
      :id="`${name}_label`"
      :for="`${name}_radio_${String(value)}`"
      :disabled="disabled"
    >
      <slot class="opacity-75">
        {{label}}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    name: {
      required: true,
      type: String
    },
    label: {
      type: String,
      required: false
    },
    value: {
      required: true
    },
    modelValue: {
      required: false,
      default: undefined
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    state () {
      if (this.modelValue === null || this.modelValue === undefined) {
        return this.checked
      }
      return this.modelValue === this.value
    }
  }
}
</script>

<style lang="sass" scoped>

.radio
  @apply mr-5 relative h-0 w-0
  &::before
    @apply absolute block rounded-full border border border-secondary left-0 w-4 h-4
    bottom: -2px
    content: ""
  &::after
    @apply absolute
    content: ""
  &:checked::after
    @apply bg-primary bg-no-repeat bg-center w-2 h-2
    bottom: 2px
    left: 4px
    mask-image: url('../../assets/images/inputs/circle-solid.svg')
  &:disabled::before,
  &:disabled::after
    @apply cursor-not-allowed opacity-50
  &:not(:disabled):checked:hover::before,
  &:not(:disabled):checked:hover::after
    @apply opacity-75
  &:not(:disabled):hover::before
    @apply cursor-pointer opacity-75
  &:not(:disabled):hover::after
    @apply cursor-pointer

.label
  @apply cursor-pointer mr-2 select-none
  &[disabled]
    @apply cursor-not-allowed opacity-50

</style>
