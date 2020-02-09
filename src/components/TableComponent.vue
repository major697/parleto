<template>
   <div class="cnt">
      <table class="table">
         <tr class="table__header">
            <th class="table__header__title">Imię</th>
            <th class="table__header__title">Nazwisko</th>
            <th class="table__header__title">Dział</th>
            <th class="table__header__title">Wynagrodzenie</th>
         </tr>
         <ListWorkerComponent v-for="(worker, i) in workers" :key="i" :worker="worker" />
         <div v-show="!workers.length" class="table__empty">
            Brak danych do wyświetlenia, spróbuj innego filtrowania.
         </div>
      </table>
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Table';
</style>

<script>
import { mapGetters } from 'vuex';
import { GettersWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'TableComponent',
   components: {
      ListWorkerComponent: () => import('./ListWorkerComponent'),
   },
   computed: {
      workers() {
         return this.GET_WORKERS();
      },
   },
   methods: {
      ...mapGetters('WorkersModule', [GettersWorkers.GET_WORKERS]),
   },
};
</script>
