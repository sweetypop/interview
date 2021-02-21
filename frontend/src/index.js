import Vue from 'vue';
import vuetify from './plugins/vuetify';
import './plugins/vuemeta';
import store from './store';
import router from './router';
import App from './App';


new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App),
});
