import { createApp } from 'vue';
import App from './App5.vue';
import mitt from 'mitt';

const emitter = mitt();
emitter.on('*', (type, e) => console.log(`## 이벤트 로그: ${type} ->`, e));

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
