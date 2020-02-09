<template>
   <button class="button" @click="$emit('clickButton')">{{ name }}</button>
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
   },
};
</script>
