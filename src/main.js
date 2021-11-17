import router from './router/router'
import store from './store/store'
import Vuesax from 'vuesax'
import App from './App.vue'
import Vue from 'vue'
import 'boxicons'


//Vuesax styles
import 'vuesax/dist/vuesax.css'
import 'boxicons/css/boxicons.min.css'

//Primevue components-styles
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';


Vue.use(Vuesax, {
  colors: {
    primary:'#2a7bc6',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'#00507D'
  }
})





Vue.config.productionTip = false
Vue.component('DataTable', DataTable)
Vue.component('Column', Column);
Vue.component('Dropdown', Dropdown);
Vue.component('Toast', Toast);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')