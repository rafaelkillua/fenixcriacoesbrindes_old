<template>
  <div class="input_box">
    <span v-if="prefix && (focus || value)" class="prefix" :class="focus ? 'border-primary' : 'border-black'">{{prefix}}</span>
    <the-mask
      v-if="mask"
      autocomplete="semautocompletecarai"
      :id="`${name}_input`"
      :ref="`${name}_input`"
      class="input bg-transparent"
      :value="value"
      @input="v => $emit('input', v)"
      @blur.native="v => $emit('blur', v)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="label"
      :name="name"
      :mask="mask"
      :masked="masked"
      :disabled="disabled"
    ></the-mask>
    <money
      v-else-if="type === 'money'"
      :id="`${name}_input`"
      :ref="`${name}_input`"
      class="input"
      :value="value"
      @input="v => $emit('input', v)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="label"
      v-bind="money"
      :name="name"
      :disabled="disabled"
    ></money>
    <v-select
      v-else-if="options"
      :inputId="`${name}_input`"
      :ref="`${name}_input`"
      class="w-full"
      :value="computedOption"
      @input="v => $emit('input', v[itemValue])"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="label"
      :disabled="disabled"
      :options="options"
      :clearable="clearable"
      :getOptionLabel="option => Array.isArray(itemText) ? itemText.map(item => option[item]).join(itemSeparator) : option[itemText]"
    >
      <span slot="no-options">Não há opções.</span>
    </v-select>
    <input
      v-else-if="type === 'password'"
      :id="`${name}_input`"
      :ref="`${name}_input`"
      class="input"
      :value="value"
      :type="showPassword ? 'text' : 'password'"
      @input="v => $emit('input', v.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="label"
      :name="name"
      :disabled="disabled"
    >
    <textarea
      v-else-if="type === 'textarea'"
      :id="`${name}_input`"
      :ref="`${name}_input`"
      class="input textarea"
      :value="value"
      @input="v => $emit('input', v.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="label"
      :name="name"
      :disabled="disabled"
      rows="3"
    />
    <input
      v-else
      autocomplete="semautocompletecarai"
      :id="`${name}_input`"
      :ref="`${name}_input`"
      class="input"
      :value="value"
      @input="v => $emit('input', v.target.value)"
      :placeholder="label"
      :name="name"
      @focus="$emit('focus'); focus = true"
      @blur="$emit('blur'); focus = false"
      :disabled="disabled"
    >
    <label v-if="!options || (options && value != -1)" :for="`${name}_input`" :disabled="disabled">{{label}}</label>
    <i v-if="type === 'password'"
      class="input_show_password fas"
      :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
      @click="showPassword = !showPassword">
    </i>
    <div class="hint">
      <slot name="hint">
        <span id="error" class="error">{{error}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'
import { Money } from 'v-money'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  props: {
    itemValue: {
      type: String,
      required: false
    },
    itemText: {
      required: false,
      type: [Array, String]
    },
    itemSeparator: {
      required: false,
      default: ' '
    },
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false
    },
    mask: {
      type: [String, Array],
      required: false
    },
    masked: {
      type: Boolean,
      required: false
    },
    options: {
      required: false,
      validator: v => (v instanceof Array) && (v.every(p => typeof p === 'object'))
    },
    prefix: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { Money, TheMask, VSelect },
  data () {
    return {
      showPassword: false,
      focus: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        allowBlank: true,
        masked: false
      }
    }
  },
  computed: {
    computedOption () {
      return this.options.find(option => option[this.itemValue] === this.value)
    }
  },
  methods: {
    focusInput () {
      this.$refs[`${this.name}_input`].focus()
    }
  }
}
</script>

<style lang="sass" scoped>

.input_box
  @apply relative block flex
  @screen lg
    @apply pb-0
  label
    @apply absolute left-0 top-0 cursor-text text-xs opacity-75
    transition: all .2s

.prefix
  @apply my-6 border-b opacity-75
  transition: all .2s
  @screen lg
    @apply mt-6 mb-8

.input
  @apply border-black border-b my-6 w-full rounded-sm
  transition: all .2s
  @screen lg
    @apply mt-6 mb-8
  &[disabled]
    @apply opacity-50 bg-transparent cursor-not-allowed
  &:focus:not([disabled])
    @apply outline-none border-primary
  &::placeholder
    @apply opacity-0
    transition: all .2s
  &:placeholder-shown:not(:focus)::placeholder
    @apply opacity-0
  &:placeholder-shown:not(:focus) + label
    @apply text-sm mt-6 opacity-50

.input_show_password
  @apply absolute opacity-50 right-0 top-0 mt-6 cursor-pointer

.error
  @apply text-red-600

.hint
  @apply absolute w-full mt-14 text-xss
  #error
    @apply text-red-600

.textarea
  @apply resize-none p-1 border rounded
  & + label
    @apply pl-1 pt-1

textarea::-webkit-scrollbar
  @screen md
    width: 8px
  @screen lg
    width: 8px

textarea::-webkit-scrollbar-track
  @screen md
    @apply bg-gray-400 rounded-lg

textarea::-webkit-scrollbar-thumb
  @screen md
    @apply bg-gray-600 rounded-lg
    &:active
      @apply bg-secondary

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus
  -webkit-box-shadow: 0 0 0 50px white inset

</style>

<style lang="sass">

.v-select
  @apply w-full bg-transparent border-black border-b my-6 rounded-sm text-sm
  @screen lg
    @apply mt-6 mb-8
  .vs__dropdown-toggle
    @apply bg-transparent border-transparent pb-0
  .vs__selected,
  .vs__search
    @apply m-0 p-0 text-black
    &[disabled]
      @apply bg-transparent

.vs--disabled
  @apply opacity-50

</style>
