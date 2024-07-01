import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router/index.js';
import dayjs from 'dayjs';
import axios from './plugins/axios.js';
import store from './plugins/store.js';
import vuetify from './plugins/vuetify.js';
import ConfirmDialog from './Mixins/ConfirmDialog.vue';
import Notification from './Mixins/Snackbar.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue3-toastify/dist/index.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import Vue3Toastify from 'vue3-toastify';

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .use(Vue3Toastify);

app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$axios = axios;
app.mixin(ConfirmDialog);
app.mixin(Notification);
app.component('VueDatePicker', VueDatePicker);
router.isReady().then(() => {
  app.mount('#app');
});
