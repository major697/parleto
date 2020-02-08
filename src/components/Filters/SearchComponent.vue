<template>
   <div class="search">
      <input
         type="text"
         class="search__input"
         placeholder="Osoba"
         @keyup="filterUser"
         v-model="user"
      />
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Filters/Search.scss';
</style>

<script>
import { mapActions } from 'vuex';
import { ActionsWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'SearchComponent',
   data() {
      return {
         user: '',
      };
   },
   methods: {
      ...mapActions('WorkersModule', [ActionsWorkers.FETCH_SEARCH_WORKERS]),
      filterUser() {
         this.FETCH_SEARCH_WORKERS(this.user);
      },
   },
};
</script>
