import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
  .use(router) // Use the router in the app
  .use(vuetify)
  .mount('#app');
