import Vue from 'vue'
import App from './App.vue'

import VueEasyDict from 'vue-easy-dict'
Vue.use(VueEasyDict)

VueEasyDict.init()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
