<template>
   <div class="cnt">
      <table class="table table--small">
         <tr class="table__header">
            <th class="table__header__title">Dział</th>
            <th class="table__header__title">Wynagrodzenie</th>
         </tr>
         <tr class="table-body" v-for="(pay, section) in getPayAndSection" :key="section">
            <td class="table-body__element">{{ section }}</td>
            <td class="table-body__element">{{ pay }}</td>
         </tr>
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
         let paySection = {};
         this.GET_WORKERS().forEach(data => {
            if (paySection.hasOwnProperty(data.section)) {
               paySection[data.section] = paySection[data.section] + parseFloat(data.pay);
            } else {
               paySection[data.section] = parseFloat(data.pay);
            }
         });
         return paySection;
      },
   },
   methods: {
      ...mapGetters('WorkersModule', [GettersWorkers.GET_WORKERS]),
   },
};
</script>
