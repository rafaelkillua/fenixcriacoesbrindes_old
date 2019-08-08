<template>
  <div>
    <input
      :id="`${name}_checkbox`"
      :name="name"
      class="checkbox"
      type="checkbox"
      :checked="state"
      :value="value"
      :disabled="disabled"
      @change="change"
      @click="v => $emit('click')"
    >
    <label
      class="label"
      :id="`${name}_label`"
      :for="`${name}_checkbox`"
      :disabled="disabled"
    >
      <slot class="opacity-75">
        {{label}}
      </slot>
    </label>
    <p class="error">{{error}}</p>
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
    checked: {
      required: false
    },
    value: {
      required: false
    },
    modelValue: {
      required: false,
      default: undefined
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: String,
      required: false
    }
  },
  computed: {
    state () {
      if (this.modelValue === undefined) {
        return this.checked
      }
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.indexOf(this.value) > -1
      }
      return !!this.modelValue
    }
  },
  methods: {
    change () {
      let value
      if (Array.isArray(this.modelValue)) {
        value = this.modelValue.slice(0)
        if (this.state) {
          value.splice(value.indexOf(this.value), 1)
        } else {
          value.push(this.value)
        }
      } else {
        value = !this.state
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="sass" scoped>

.checkbox
  @apply mr-5 relative h-0 w-0
  &::before
    @apply absolute block rounded-sm border border border-secondary left-0 w-4 h-4
    bottom: -2px
    content: ""
  &::after
    @apply absolute
    content: ""
  &:checked::after
    @apply bg-primary bg-no-repeat bg-center w-3 h-3 bottom-0
    left: 2px
    mask-image: url('../../assets/images/inputs/check-solid.svg')
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

.error
  @apply w-full text-xss text-red-600

</style>
