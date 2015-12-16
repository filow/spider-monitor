import Vue from 'vue'
import App from './app.vue'
require('./style/theme/style.scss')
new Vue({
  el: 'body',
  components: {
    app: App
  }
})
