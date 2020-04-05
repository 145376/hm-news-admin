import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//配置axios
import axios from "axios";
//请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$axios = axios;

//引入element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

//富编辑器组件
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
Vue.use(VueQuillEditor);

//全局过滤器
import moment from "moment";
Vue.filter("date", input => {
  return moment(input).format("YYYY-MM-DD");
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
