// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFormWizard from 'vue-form-wizard'

// Require the main Sass manifest file
require('./assets/sass/main.scss');

import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
