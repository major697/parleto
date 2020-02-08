<template>
   <div class="home">
      <div class="home__title">Tabela pracowników</div>
      <div class="home__filters">
         <SearchComponent />
      </div>
      <div class="home__filters home__filters--bottom">
         <FlterButtonComponent
            v-for="section in getSection"
            :key="section"
            :section="section"
            @selectFilter="selectFilter"
         />
      </div>
      <TableComponent />
      <PaySectionComponent />
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/views/Home.scss';
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ActionsWorkers, GettersWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'HomeView',
   data() {
      return {
         selectedSection: '',
      };
   },
   components: {
      SearchComponent: () => import('@/components/Filters/SearchComponent'),
      FlterButtonComponent: () => import('@/components/Filters/FlterButtonComponent'),
      TableComponent: () => import('@/components/TableComponent'),
      PaySectionComponent: () => import('@/components/PaySectionComponent'),
   },
   computed: {
      getSection() {
         return this.GET_WORKERS_SECTION();
      },
   },
   methods: {
      ...mapActions('WorkersModule', [
         ActionsWorkers.FETCH_WORKERS,
         ActionsWorkers.FETCH_SELECT_FILTERS_WORKERS,
      ]),
      ...mapGetters('WorkersModule', [GettersWorkers.GET_WORKERS_SECTION]),
      storeSelectedSection(filter) {
         if (this.selectedSection === filter) {
            this.selectedSection = '';
         } else {
            this.selectedSection = filter;
         }
      },
      selectFilter(filter) {
         this.storeSelectedSection(filter);
         this.FETCH_SELECT_FILTERS_WORKERS(this.selectedSection);
      },
   },
   mounted() {
      this.FETCH_WORKERS();
   },
};
</script>
