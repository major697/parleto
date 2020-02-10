<template>
   <button
      class="button"
      :class="{ 'button--close': close }"
      :type="type"
      @click="$emit('clickButton')"
   >
      {{ name }}
   </button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Buttons/Button.scss';
</style>

<script>
export default {
   name: 'ButtonComponent',
   props: {
      name: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         default: 'button',
      },
      close: {
         type: Boolean,
         default: false,
      },
   },
};
</script>
