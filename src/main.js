import Vue from 'vue'
import App from './App.vue'

import Toasted from 'vue-toasted';

import dvDialogs from './plugins/dvDialogs'

Vue.use(Toasted)
Vue.use(dvDialogs)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
