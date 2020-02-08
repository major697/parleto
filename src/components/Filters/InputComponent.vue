<template>
   <div class="search">
      <input
         type="text"
         class="search__input"
         :placeholder="placeholder"
         @keyup="$emit('filterValue', $event.target.value)"
         :size="size"
      />
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Filters/Input.scss';
</style>

<script>
export default {
   name: 'InputComponent',
   props: {
      placeholder: {
         type: String,
         required: true,
      },
      size: {
         type: String,
         default: '20',
      },
   },
};
</script>
