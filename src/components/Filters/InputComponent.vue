<template>
   <div class="search">
      <input
         type="text"
         class="search__input"
         :placeholder="placeholder"
         @keyup="searchText"
         :size="size"
         v-model="text"
      />
      <span class="search__image" v-show="close" @click="closeSearchText" title="Usuń"></span>
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Filters/Input.scss';
</style>

<script>
export default {
   name: 'InputComponent',
   data() {
      return {
         text: '',
         close: false,
      };
   },
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
   methods: {
      searchText() {
         if (this.text === '') {
            this.close = false;
         } else {
            this.close = true;
         }
         this.$emit('filterValue', this.text);
      },
      closeSearchText() {
         this.text = '';
         this.close = false;
         this.$emit('filterValue', '');
      },
   },
};
</script>
