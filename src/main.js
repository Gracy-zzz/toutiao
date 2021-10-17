// main.js页面
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vue from 'vue'
import './styles/icon.less'
import axios from 'axios'

// 加载Vant组件库
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/button/style'
import 'vant/lib/index.css'

// 加载全局样式(最好放在最后面，方便去覆盖第三方样式)
import './styles/index.less'

// 自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'

createApp(App).use(store).use(router).use(Vant).mount('#app')
const app = createApp(App)
app.config.globalProperties.$http = axios
