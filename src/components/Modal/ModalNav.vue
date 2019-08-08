<template>
  <div class="modal">
     <div class="modal-container">
      <div class="modal-header">
          <div class="logo" @click="$emit('closeModal')"/>
          <p class="close" @click="$emit('closeModal')">
            <i class="fas fa-times"></i>
          </p>
      </div>

      <div class="modal-body">
        <slot name="body">
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.modal
  @apply fixed top-0 left-0 flex flex-col z-50 w-screen bg-gray-700 h-screen

.modal-container
  @apply h-full w-full mx-auto bg-white flex flex-col items-center

.modal-header
  @apply w-full px-4 h-16 flex items-center justify-between mt-2

.logo
  @apply bg-no-repeat bg-center h-12 w-32 cursor-pointer bg-contain
  background-image: url(../../assets/images/fenix.png)

.close
  @apply text-secondary text-lg cursor-pointer

.modal-body
  @apply w-full px-4

.modal-body-container
  @apply flex flex-col

.link
  @apply font-medium text-secondary mt-4
  &_dashboard
    @apply font-medium text-secondary mt-3 text-sm
  &#loginbusiness
    @apply text-primary

.modal-footer
  @apply w-full px-4 absolute bottom-0 mb-4

</style>
