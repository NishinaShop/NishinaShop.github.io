<template>
  <div>
    <section class="hero">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h3 class="mt-5">Detalles del carrito</h3>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted"> Tienes {{ n_productos }} productos en tu carrito</p></div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section-->
    <section>
      <div class="container">
        <div class="row mb-5"> 
          <div class="col-lg-8">
            <div class="cart">
              <div class="cart-wrapper">
                <div class="cart-header text-center">
                  <div class="row">
                    <div class="col-5">Producto</div>
                    <div class="col-2">Precio</div>
                    <div class="col-2">Cantidad</div>
                    <div class="col-2">Total</div>
                    <div class="col-1"></div>
                  </div>
                </div>
                <div class="cart-body" v-if="!load_data">
                  <!-- Product-->
                  <div class="" v-for="item in carrito">
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
                      <div class="col-1 text-center"><a class="cart-remove" style="cursor:pointer" v-on:click="eliminar_producto_cart(item._id)"> <i class="fa fa-times"></i></a></div>
                    </div>
                  </div>
                </div>
                <div class="cart-body" v-if="load_data">
                  <div class="row">
                    <div class="col-12">
                      <img src="../../../public/assets/img/loading.gif" style="width: 60px !important;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-5 d-flex justify-content-between flex-column flex-lg-row"><router-link class="btn btn-dark " to="/catalogo"><i class="fa fa-chevron-left"></i> Continuar comprando</router-link></div>
          </div>
          <div class="col-lg-4">
            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Tu orden</h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p class="text-sm">El costo del envio puede variar dependiendode Codigo postal.</p>
                <ul class="order-summary mb-0 list-unstyled">
                  <li class="order-summary-item"><span>Subtotal: </span><span>&nbsp;&nbsp; {{ convertCurrency(total) }}</span></li>
                  <li class="order-summary-item"><span>Costo del envio:</span><span>&nbsp;&nbsp; {{ convertCurrency(envio) }}</span></li>
                  <li class="order-summary-item border-0 "><span class="text-center">Total: </span><strong class="order-summary-total ">&nbsp;&nbsp; {{ convertCurrency(total+envio) }}</strong></li>
                </ul>
              </div>
              <router-link class="btn btn-dark" :to="{name: 'pago_carrito'}">Proceder al pago <i class="fa fa-chevron-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
var currencyFormatter = require ('currency-formatter');

export default {
  name: 'detallesCartApp',
  data(){
    return{
      n_productos: 0,
      total: 0,
      carrito:[],
      load_data: true,
      envio:1
    }
  },
  methods:{
    init_carrito() {
      
      if(this.$store.state.token != null){
        this.load_data = true
        this.total = 0
        axios.get(this.$url + "/obtener_carrito", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        })
        .then((result) => {
          console.log(result.data.cart_general)
          this.n_productos = result.data.cart_general.length
          for(var item of result.data.cart_general){
            let subtotal = item.producto.precio * item.cantidad
            this.total = this.total + subtotal 
          }
          this.carrito = result.data.cart_general
          this.load_data = false
        }); 
      }
    },
    convertCurrency(number){
          return currencyFormatter.format(number,{code:'MXN'})
    },
    eliminar_producto_cart(id){
      axios.delete(this.$url + "/eliminar_producto_carrito/"+id,{
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        }).then((result)=>{
          this.init_carrito()
          this.$socket.emit('send_cart',true)
        })
    },
  },
  beforeMount(){
    this.init_carrito()
  }
}

</script>
