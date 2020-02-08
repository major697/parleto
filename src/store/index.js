import Vue from 'vue';
import Vuex from 'vuex';
import WorkersModule from './modules/Workers';

Vue.use(Vuex);

const store = new Vuex.Store({
   modules: {
      WorkersModule,
   },
});

export default store;
