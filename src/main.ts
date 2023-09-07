import 'normalize.css';               // 第三方库样式
import './assets/css/common.css';     // 通用样式
import './assets/css/transition.css'; // 过渡或动画样式
import VueVirtualScroller from 'vue-virtual-scroller'; // 组件库样式（如果有）
import './index.css';                 // 其他特定样式

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const app = createApp(App);

app.use(createPinia());
app.use(VueVirtualScroller);
app.use(router);
app.mount('#app');