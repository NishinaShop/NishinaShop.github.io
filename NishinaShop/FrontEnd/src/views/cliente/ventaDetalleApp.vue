<template>
  <div>
    <div v-if="load_data">
     <div v-if="acceso">
      <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h3 class="mt-5">Orden #{{ n_orden.toString().padStart(6,'0') }}</h3>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">La orden  #{{ n_orden.toString().padStart(6,'0') }} se realizó el <strong>{{ cDate(venta.createdAt) }}</strong> y actualmente se encuentra en <strong>preparación.</strong>.</p>
              <p class="text-muted">Si tiene alguna pregunta, no dude en<a > contactarnos</a>, nuestro centro de atención al cliente está trabajando para usted de <br> 8:00 a 7:00, Lunes a Viernes</p></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-xl-9">
            <div class="cart">
              <div class="cart-wrapper">
                <div class="cart-header text-center">
                  <div class="row">
                    <div class="col-6">Nombre</div>
                    <div class="col-2">Precio</div>
                    <div class="col-2">Cantidad</div>
                    <div class="col-2">Total</div>
                  </div>
                </div>
                <div class="cart-body">
                  <!-- Product-->
                  <div class="" v-for="item in detalles">
                    <div class="row d-flex align-items-center text-center">
                      <div class="col-5">
                        <div class="d-flex align-items-center"><router-link :to="{name: 'detalles_producto',params:{slug: item.producto.slug}}"><img class="cart-item-img" :src="$url+'/obtener_portada_producto/'+item.producto.portada"  alt="..."></router-link>
                          <div class="cart-title text-start"><router-link class="text-uppercase text-dark" :to="{name: 'detalles_producto',params:{slug: item.producto.slug}}"><strong>{{ item.producto.nombre.substr(0,20) }}</strong></router-link><br><span class="text-muted text-sm">Talla: {{ item.variedad.talla }}</span><br><span class="text-muted text-sm">Color: {{ item.variedad.color }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-2">{{convertCurrency(item.producto.precio)}}</div>
                      <div class="col-2">
                        {{ item.cantidad }}
                      </div>
                      <div class="col-2 text-center">{{convertCurrency(item.producto.precio*item.cantidad)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row my-5">
              <div class="col-md-6">
                <div class="block mb-5">
                  <div class="block-header">
                <h6 class="text-uppercase mb-0">Tu orden</h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p class="text-sm">El costo del envio puede variar dependiendode Codigo postal.</p>
                <ul class="order-summary mb-0 list-unstyled">
                  <li class="order-summary-item"><span>Subtotal: </span><span>&nbsp;&nbsp; {{ convertCurrency(venta.total) }}</span></li>
                  <li class="order-summary-item"><span>Costo del envio:</span><span>&nbsp;&nbsp; {{ convertCurrency(venta.envio) }}</span></li>
                  <li class="order-summary-item border-0 "><span class="text-center">Total: </span><strong class="order-summary-total ">&nbsp;&nbsp; {{ convertCurrency(venta.total+venta.envio) }}</strong></li>
                </ul>
              </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="block-header">
                  <h6 class="text-uppercase mb-0">Direccion de envio</h6>
                </div>
                <div class="block-body bg-light pt-1">
                  <p>{{ venta.direccion.nombre }}<br>{{ venta.direccion.calle }} {{ venta.direccion.colonia }}<br>CP.{{ venta.direccion.codigo_postal }},<br> {{ venta.direccion.ciudad }}<br>{{ venta.direccion.estado }}<br><strong>Tel: {{ venta.direccion.n_contacto }}</strong></p>
                </div>
              </div>
            </div>
          </div>
          <!-- Customer Sidebar-->
          <div class="col-xl-3 col-lg-4 mb-5">
            <div class="customer-sidebar card border-0"> 
              <div class="customer-profile"><a class="d-inline-block" href="#"><img class="img-fluid rounded-circle customer-image shadow" src="../../../public/img/avatar-1.png" alt=""></a>
                <h5>Usuario</h5>
                <p class="text-muted text-sm mb-0"></p>
              </div>
              <nav class=" customer-nav"><a class="active list-group-item d-flex justify-content-between align-items-center text-decoration-none" href="customer-orders.html"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#paper-bag-1"> </use>
                    </svg>Ordenes</span>
                  <div class="badge rounded-pill bg-light text-dark fw-normal px-3">0</div></a><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none" href="customer-account.html"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#male-user-1"> </use>
                    </svg>Perfil</span></a><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none" href="customer-addresses.html"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#navigation-map-1"> </use>
                    </svg>Direcciones</span></a><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none" href="customer-login.html"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#exit-1"> </use>
                    </svg>Cerrar sessión</span></a>
              </nav>
            </div>
          </div>
          <!-- /Customer Sidebar-->
        </div>
      </div>
    </section> 
     </div>
     <div v-if="!acceso">
      <div class="container mb-6 mt-6" >
        <div class="row">
          <div class="col-12 text-center">
            <h1>No tienes acceso a esta zona</h1>
          </div>
        </div>
      </div>
     </div> 
    </div>  
    <div v-if="!load_data">
      <div class="container mb-6 mt-6" >
        <div class="row">
          <div class="col-12 text-center">
            <img src="../../../public/assets/img/loading.gif" style="width: 80px;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
var currencyFormatter = require ('currency-formatter');

export default {
  name: 'ventaDetalleApp',
  data(){
    return{
      venta: {},
      detalles: [],
      acceso: true,
      load_data: true,
      n_orden : 0
    }
  },
  beforeMount(){
    
  },
  methods:{
    init_venta(){
      axios.get(this.$url+'/obtener_venta/'+this.$route.params.id,{
        headers:{
          'Content-Type': 'application/JSON',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        if(result.data.message){
          this.acceso= false
        }else{
          this.venta = result.data.venta
        this.detalles = result.data.detalles
        this.acceso= true
        this.n_orden = result.data.venta.serie
        }
      })
    },
    cDate(item){
      return moment(item).format('DD/MM/YYYY')
    },
    convertCurrency(number){
          return currencyFormatter.format(number,{code:'MXN'})
    },
  }
}
</script>