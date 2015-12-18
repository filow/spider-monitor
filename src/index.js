import Vue from 'vue'
import App from './app.vue'
require('./style/theme/style.scss')
require('./style/animate.css')
new Vue({
  el: 'body',
  components: {
    app: App
  }
})

toastr.options = {
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "timeOut": "3000",
  "showEasing": "swing",
  "hideEasing": "linear",
}
