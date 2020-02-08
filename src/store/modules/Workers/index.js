import { ActionsWorkers, MutationsWorkers, GettersWorkers } from './types';
import { workersList } from '@/services/workers';

const WorkersModule = {
   namespaced: true,
   strict: true,
   state: {
      workers: [],
      workerAll: [],
   },
   actions: {
      [ActionsWorkers.FETCH_WORKERS]({ commit }) {
         commit(MutationsWorkers.SET_WORKERS, workersList);
      },
      [ActionsWorkers.FETCH_SEARCH_WORKERS]({ commit }, payload) {
         commit(MutationsWorkers.SET_SEARCH_WORKERS, { filter: payload, type: 'search' });
      },
      [ActionsWorkers.FETCH_SELECT_FILTERS_WORKERS]({ commit }, payload) {
         commit(MutationsWorkers.SET_SEARCH_WORKERS, { filter: payload, type: 'section' });
      },
   },
   mutations: {
      [MutationsWorkers.SET_WORKERS](state, payload) {
         state.workerAll = payload;
         state.workers = payload;
      },
      [MutationsWorkers.SET_SEARCH_WORKERS](state, payload) {
         const { filter, type } = payload;

         state.workers = state.workerAll.filter(worker => {
            let dataFilter = {};

            switch (type) {
               case 'search':
                  dataFilter = {
                     name: worker.name,
                     surname: worker.surname,
                  };
                  break;
               case 'section':
                  dataFilter = {
                     section: worker.section,
                  };
                  break;
            }

            for (let key in dataFilter) {
               if (
                  String(worker[key])
                     .toLowerCase()
                     .indexOf(filter.toLowerCase()) !== -1
               ) {
                  return true;
               }
            }
            return false;
         });
      },
   },
   getters: {
      [GettersWorkers.GET_WORKERS](state) {
         return state.workers;
      },
      [GettersWorkers.GET_WORKERS_SECTION](state) {
         let section = [];
         state.workers.forEach(worker => {
            if (section.indexOf(worker.section) < 0) {
               section.push(worker.section);
            }
         });

         return section;
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
