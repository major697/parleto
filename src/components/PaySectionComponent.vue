<template>
   <div class="cnt">
      <table class="table table--small">
         <tr class="table__header">
            <th class="table__header__title">Dział</th>
            <th class="table__header__title">Wynagrodzenie całkowite</th>
         </tr>
         <tr class="table-body" v-for="(pay, section) in getPayAndSection" :key="section">
            <td class="table-body__element">{{ section }}</td>
            <td class="table-body__element">{{ pay }}</td>
         </tr>
         <div v-show="!Object.keys(getPayAndSection).length" class="table__empty">
            Brak danych do wyświetlenia, spróbuj innego filtrowania.
         </div>
      </table>
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Table';
@import '@/assets/scss/components/TableBody';
</style>

<script>
import { mapGetters } from 'vuex';
import { GettersWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'PaySectionComponent',
   computed: {
      getPayAndSection() {
         return this.GET_WORKERS_PAY_SECTION();
      },
   },
   methods: {
      ...mapGetters('WorkersModule', [GettersWorkers.GET_WORKERS_PAY_SECTION]),
   },
};
</script>
