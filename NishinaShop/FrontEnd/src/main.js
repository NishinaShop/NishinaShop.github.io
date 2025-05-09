import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('https://api-nishinashop.onrender.com/')

const app = createApp(App);
app.use(new VueSocketIO({
    debug: true,
    connection: socketConnection,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

app.config.globalProperties.$url = 'https://api-nishinashop.onrender.com/api';
app.config.globalProperties.$token = localStorage.getItem('token');

app.use(store).use(router).mount('#app');
