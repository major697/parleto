<template>
   <div>
      <div class="home">
         <div class="home__title">Tabela pracowników</div>
         <div class="home__filters">
            <div class="home__filters__section">
               <span>Wynagrodzenie: </span>
               <InputComponent placeholder="Od" size="3" @filterValue="filterPayFrom" />
               <InputComponent placeholder="Do" size="3" @filterValue="filterPayTo" />
            </div>
            <div class="home__filters__section">
               <span>Szukaj: </span>
               <InputComponent placeholder="Osoba" size="20" @filterValue="filterSearch" />
               <ButtonComponent name="Dodaj pracownika" @clickButton="modal = true" />
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
      <ModalComponent v-if="modal" @closeModal="closeModal" title="Dodaj pracownika">
         <div slot="body">
            <ValidationObserver ref="formAddWorker">
               <form @submit.prevent="addWorker">
                  <div class="input">
                     <label for="name" class="input__label">Imie</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                        <input
                           type="text"
                           class="input__text"
                           name="name"
                           v-model="workerForm.name"
                        />
                        <span class="error">{{ errors[0] }}</span>
                     </validation-provider>
                  </div>
                  <div class="input">
                     <label for="surname" class="input__label">Nazwisko</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                        <input
                           type="text"
                           class="input__text"
                           name="surname"
                           v-model="workerForm.surname"
                        />
                        <span class="error">{{ errors[0] }}</span>
                     </validation-provider>
                  </div>
                  <div class="input">
                     <label for="section" class="input__label">Dział</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                        <select name="section" v-model="workerForm.section" class="input__select">
                           <option disabled value="">Wybierz dział</option>
                           <option v-for="section in sections" :key="section" :value="section">{{
                              section
                           }}</option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                     </validation-provider>
                  </div>
                  <div class="input">
                     <label for="pay" class="input__label">Wynagrodzenie</label>
                     <validation-provider rules="required|numeric" v-slot="{ errors }">
                        <input
                           type="text"
                           class="input__text"
                           name="pay"
                           v-model="workerForm.pay"
                        />
                        <span class="error">{{ errors[0] }}</span>
                     </validation-provider>
                  </div>
                  <div class="input">
                     <label for="currency" class="input__label">Waluta</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                        <input
                           type="text"
                           class="input__text"
                           name="currency"
                           v-model="workerForm.currency"
                           value="PLN"
                        />
                        <span class="error">{{ errors[0] }}</span>
                     </validation-provider>
                  </div>
                  <div class="input__button-pos">
                     <ButtonComponent name="Anuluj" :close="true" @click.native="closeModal" />
                     <ButtonComponent name="Zapisz" type="submit" />
                  </div>
               </form>
            </ValidationObserver>
         </div>
      </ModalComponent>
   </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/views/Home.scss';
@import '../assets/scss/components/Inputs/Input.scss';
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ActionsWorkers, GettersWorkers } from '@/store/modules/Workers/types';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';

extend('required', {
   ...required,
   message: 'To pole jest wymagane.',
});

extend('numeric', {
   ...numeric,
   message: 'Wartość podaj w liczbie.',
});

export default {
   name: 'HomeView',
   data() {
      return {
         selectedSection: '',
         modal: false,
         workerForm: {
            name: '',
            surname: '',
            section: '',
            pay: '',
            currency: 'PLN',
         },
      };
   },
   components: {
      InputComponent: () => import('@/components/Filters/InputComponent'),
      FlterButtonComponent: () => import('@/components/Filters/FlterButtonComponent'),
      ButtonComponent: () => import('@/components/Buttons/ButtonComponent'),
      TableComponent: () => import('@/components/TableComponent'),
      PaySectionComponent: () => import('@/components/PaySectionComponent'),
      ModalComponent: () => import('@/components/Modals/ModalComponent'),
      ValidationProvider,
      ValidationObserver,
   },
   computed: {
      getSection() {
         return this.GET_WORKERS_SECTION();
      },
      sections() {
         return this.GET_WORKERS_SECTION_ALL();
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
         ActionsWorkers.FETCH_ADD_WORKER,
      ]),
      ...mapGetters('WorkersModule', [
         GettersWorkers.GET_WORKERS_SECTION,
         GettersWorkers.GET_WORKERS_SECTION_ALL,
      ]),
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
      closeModal() {
         this.modal = false;
         this.resetForm();
      },
      resetForm() {
         this.workerForm.name = '';
         this.workerForm.surname = '';
         this.workerForm.section = '';
         this.workerForm.pay = '';
         this.workerForm.currency = 'PLN';
      },
      addWorker() {
         this.$refs.formAddWorker.validate().then(success => {
            if (success) {
               const worker = {
                  name: this.workerForm.name,
                  surname: this.workerForm.surname,
                  section: this.workerForm.section,
                  pay: this.workerForm.pay,
                  currency: this.workerForm.currency,
               };
               this.FETCH_ADD_WORKER(worker)
                  .then(() => {
                     console.log('dodano');
                     this.modal = false;
                     this.resetForm();
                     this.$toasted.show('Pracownik został dodany poprawnie.');
                  })
                  .catch(error => console.error(error));
            }
         });
      },
   },
   mounted() {
      this.FETCH_WORKERS();
   },
};
</script>
