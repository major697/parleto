<template>
   <div class="home">
      <div class="home__title">Tabela pracowników</div>
      <TableComponent />
      <PaySectionComponent />
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/views/Home';
</style>

<script>
import { mapActions } from 'vuex';
import { ActionsWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'HomeView',
   components: {
      TableComponent: () => import('@/components/TableComponent'),
      PaySectionComponent: () => import('@/components/PaySectionComponent'),
   },
   methods: {
      ...mapActions('WorkersModule', [ActionsWorkers.FETCH_WORKERS]),
   },
   mounted() {
      this.FETCH_WORKERS();
   },
};
</script>
