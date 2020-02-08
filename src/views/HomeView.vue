<template>
   <div class="home">
      <div class="home__title">Tabela pracowników</div>
      <div class="home__filters">
         <div class="home__filters__section">
            <span>Wynagrodzenie: </span>
            <InputComponent placeholder="Od" size="1" @filterValue="filterPayFrom" />
            <InputComponent placeholder="Do" size="1" @filterValue="filterPayTo" />
         </div>
         <div class="home__filters__section">
            <span>Szukaj: </span>
            <InputComponent placeholder="Osoba" size="20" @filterValue="filterSearch" />
         </div>
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
      InputComponent: () => import('@/components/Filters/InputComponent'),
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
         ActionsWorkers.FETCH_FILTERS,
         ActionsWorkers.FETCH_SEARCH,
         ActionsWorkers.FETCH_SECTION,
         ActionsWorkers.FETCH_PAY_FROM,
         ActionsWorkers.FETCH_PAY_TO,
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
         this.FETCH_SECTION(this.selectedSection);
         this.FETCH_FILTERS();
      },
      filterPayFrom(value) {
         this.FETCH_PAY_FROM(value);
         this.FETCH_FILTERS();
      },
      filterPayTo(value) {
         this.FETCH_PAY_TO(value);
         this.FETCH_FILTERS();
      },
      filterSearch(value) {
         this.FETCH_SEARCH(value);
         this.FETCH_FILTERS();
      },
   },
   mounted() {
      this.FETCH_WORKERS();
   },
};
</script>
