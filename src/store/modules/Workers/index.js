import { ActionsWorkers, MutationsWorkers, GettersWorkers } from './types';
import { workersList } from '@/services/workers';

const WorkersModule = {
   namespaced: true,
   strict: true,
   state: {
      workers: [],
   },
   actions: {
      [ActionsWorkers.FETCH_WORKERS]({ commit }) {
         commit(MutationsWorkers.SET_WORKERS, workersList);
      },
   },
   mutations: {
      [MutationsWorkers.SET_WORKERS](state, payload) {
         state.workers = payload;
      },
   },
   getters: {
      [GettersWorkers.GET_WORKERS](state) {
         return state.workers;
      },
   },
};

export default WorkersModule;
