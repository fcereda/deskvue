import Vue from 'vue'
import App from './App.vue'

import Toasted from 'vue-toasted';
import dvDialogs from './plugins/dvDialogs'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

Vue.use(Toasted)
Vue.use(dvDialogs)
Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
