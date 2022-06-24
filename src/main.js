import { createApp } from 'vue'
import App from './App.vue'
// import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic'
import 'fomantic-ui-css/semantic.min.css'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import qs from 'qs'
window.$ = $


axios.defaults.withCredentials = true  //设置跨域时候写的cookie信息
 

const app = createApp(App)
app.use(qs,qs)
// app.use(FomanticUI)
app.use(VueAxios, axios)
// app.provide('axios', app.config.globalProperties.axios)
app.use(router).use(store)
// app.mount('#app')
router.isReady().then(() => {
    app.mount('#app')
})
