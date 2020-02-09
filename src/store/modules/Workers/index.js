import { ActionsWorkers, MutationsWorkers, GettersWorkers } from './types';
import { workersList } from '@/services/workers';
import { getSection } from '@/services/workers.action';

const WorkersModule = {
   namespaced: true,
   strict: true,
   state: {
      workers: [],
      workersAll: [],
      filterSelect: {
         search: null,
         section: null,
         payFrom: null,
         payTo: null,
      },
   },
   actions: {
      [ActionsWorkers.FETCH_WORKERS]({ commit }) {
         commit(MutationsWorkers.SET_WORKERS, workersList);
      },
      [ActionsWorkers.FETCH_SEARCH]({ commit }, payload) {
         commit(MutationsWorkers.SET_SEARCH, payload);
      },
      [ActionsWorkers.FETCH_SECTION]({ commit }, payload) {
         commit(MutationsWorkers.SET_SECTION, payload);
      },
      [ActionsWorkers.FETCH_PAY_FROM]({ commit }, payload) {
         commit(MutationsWorkers.SET_PAY_FROM, payload.replace(/,/g, '.'));
      },
      [ActionsWorkers.FETCH_PAY_TO]({ commit }, payload) {
         commit(MutationsWorkers.SET_PAY_TO, payload.replace(/,/g, '.'));
      },
      [ActionsWorkers.FETCH_FILTERS]({ commit, state }) {
         let search = state.workersAll;

         if (state.filterSelect.search) {
            search = search.filter(worker => {
               const dataFilter = {
                  name: worker.name,
                  surname: worker.surname,
               };

               for (let key in dataFilter) {
                  if (
                     String(worker[key])
                        .toLowerCase()
                        .indexOf(state.filterSelect.search.toLowerCase()) !== -1
                  ) {
                     return true;
                  }
               }
               return false;
            });
         }

         if (state.filterSelect.section) {
            search = search.filter(worker => {
               const dataFilter = {
                  section: worker.section,
               };

               for (let key in dataFilter) {
                  if (
                     String(worker[key])
                        .toLowerCase()
                        .indexOf(state.filterSelect.section.toLowerCase()) !== -1
                  ) {
                     return true;
                  }
               }
               return false;
            });
         }

         if (state.filterSelect.payFrom) {
            search = search.filter(worker => {
               const dataFilter = {
                  pay: worker.pay,
               };

               for (let key in dataFilter) {
                  if (parseFloat(worker[key]) >= state.filterSelect.payFrom) {
                     return true;
                  }
               }
               return false;
            });
         }

         if (state.filterSelect.payTo) {
            search = search.filter(worker => {
               const dataFilter = {
                  pay: worker.pay,
               };

               for (let key in dataFilter) {
                  if (parseFloat(worker[key]) <= state.filterSelect.payTo) {
                     return true;
                  }
               }
               return false;
            });
         }

         commit(MutationsWorkers.SET_FETCH_FILTERS, search);
      },
   },
   mutations: {
      [MutationsWorkers.SET_WORKERS](state, payload) {
         state.workersAll = payload;
         state.workers = payload;
      },
      [MutationsWorkers.SET_SEARCH](state, payload) {
         state.filterSelect.search = payload;
      },
      [MutationsWorkers.SET_SECTION](state, payload) {
         state.filterSelect.section = payload;
      },
      [MutationsWorkers.SET_PAY_FROM](state, payload) {
         state.filterSelect.payFrom = payload;
      },
      [MutationsWorkers.SET_PAY_TO](state, payload) {
         state.filterSelect.payTo = payload;
      },
      [MutationsWorkers.SET_FETCH_FILTERS](state, payload) {
         state.workers = payload;
      },
   },
   getters: {
      [GettersWorkers.GET_WORKERS](state) {
         return state.workers;
      },
      [GettersWorkers.GET_WORKERS_SECTION](state) {
         return getSection(state.workers);
      },
      [GettersWorkers.GET_WORKERS_SECTION_ALL](state) {
         return getSection(state.workersAll);
      },
      [GettersWorkers.GET_WORKERS_PAY_SECTION](state) {
         let paySection = {};
         state.workers.forEach(data => {
            if (paySection.hasOwnProperty(data.section)) {
               paySection[data.section] = paySection[data.section] + parseFloat(data.pay);
            } else {
               paySection[data.section] = parseFloat(data.pay);
            }
         });
         return paySection;
      },
   },
};

export default WorkersModule;
