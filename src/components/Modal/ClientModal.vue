<template>
  <div class="modal">
    <div class="backdrop" @click="close"/>
    <div class="container flex justify-center items-center">
      <div class="content">
        <p class="close" @click="close">
          <i class="fas fa-times"></i>
        </p>
        <div class="content_input">
          <v-input name="name" v-model="form.name" label="Nome"></v-input>
          <v-input name="email" v-model="form.email" label="E-mail"></v-input>
          <v-input name="phone" v-model="form.phone" label="Telefone" :mask="['(##) ####-####', '(##) #####-####']"></v-input>
          <v-input name="address" v-model="form.address" label="Endereço"></v-input>
          <v-button class="flex justify-center" @click="submit" :loading="loading">Criar</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/Inputs/Input'
import VButton from '@/components/Buttons/Button'

import Clients from '@/services/Clients'

export default {
  name: 'client-modal',
  components: { VInput, VButton },
  data () {
    return {
      loading: false,

      form: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    async submit () {
      if (!this.loading) {
        this.loading = true
        try {
          await Clients.newClient(this.form)
          this.close()
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.modal
  @apply fixed flex items-center justify-center z-50 w-screen h-screen top-0 left-0

.backdrop
  @apply fixed z-40 w-full h-full top-0 left-0
  background: rgba(29,26,26,.50)

.content
  @apply relative w-full bg-white z-50 flex flex-col justify-center rounded-lg py-8
  @screen lg
    @apply w-2/3

.close
  @apply absolute right-0 top-0 text-secondary rounded-full p-1 m-1 cursor-pointer
  @screen lg
    @apply m-2 p-2

.content_input
  @apply flex flex-col w-full px-4
  @screen lg
    @apply px-8

.content_confirm
  @apply flex flex-col items-center px-2

.title
  @apply font-bold mb-3 text-primary

</style>
