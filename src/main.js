import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Toasted from 'vue-toasted';
import { OptionsToasted } from './services/config';

Vue.config.productionTip = false;
Vue.use(Toasted, OptionsToasted);

new Vue({
   store,
   render: h => h(App),
}).$mount('#app');
