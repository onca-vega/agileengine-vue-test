import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import Dependencies from '@/plugins/dependencies'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Dependencies(store))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
