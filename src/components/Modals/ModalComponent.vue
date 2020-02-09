<template>
   <div class="modal">
      <div class="modal__wrapper">
         <div class="modal__container">
            <button class="modal__container__close" @click="$emit('closeModal')">x</button>
            <div class="modal__container__name">{{ title }}</div>
            <div class="modal__container__body">
               <slot name="body"></slot>
            </div>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Modals/Modal.scss';
</style>

<script>
export default {
   name: 'ModalComponent',
   props: {
      title: {
         type: String,
         required: true,
      },
   },
};
</script>
