import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {path:'/login', name: 'login', component: ()=> import ('@/views/loginApp.vue')},
  {path:'/catalogo', name: 'catalogo', component: ()=> import ('@/views/productos/catalogoApp.vue')},
  {path:'/detalles_producto/:slug', name: 'detalles_producto', component: ()=> import ('@/views/productos/detallesProductoApp.vue')},
  {path:'/detalles_carrito', name: 'detalles_carrito', component: ()=> import ('@/views/carrito/detalleCartApp.vue')},
  {path:'/direcciones_cliente', name: 'direcciones_cliente', component: ()=> import ('@/views/cliente/direccionesApp.vue')},
  {path:'/pago_carrito', name: 'pago_carrito', component: ()=> import ('@/views/carrito/pagoCartApp.vue')},
  {path:'/validation/:estado/:direccion?', name: 'validation', component: ()=> import ('@/views/validacionView.vue')},
  {path:'/cuenta/venta/:id', name: 'venta_detalle', component: ()=> import ('@/views/cliente/ventaDetalleApp.vue')}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
