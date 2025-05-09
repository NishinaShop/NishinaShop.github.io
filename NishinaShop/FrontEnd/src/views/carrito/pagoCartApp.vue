<template>
  <div>
    <section class="hero">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center mt-4">
          <h3 class="">Checkout</h3>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Por favor revisa tu orden.</p></div>
          </div>
        </div>
      </div>
    </section>
    <!-- Checkout-->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8">

            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0"><b>Dirección de entrega</b></h6>
            </div>
              <div class="block-body">
                <div class="row">
                  <div class="mb-4 col-md-6 d-flex align-items-center" v-for="item in direcciones">
                    <input type="radio" name="shippping" id="option0" :value="item._id" v-on:change="seleccionar_direccion($event)">
                    <label class="ms-3" for="option0"><strong class="d-block text-uppercase mb-2">{{ item.calle+', '+item.colonia }}</strong>
                      <span class="text-muted ">{{'CP: '+item.codigo_postal+', '+item.ciudad+', '+item.estado}}</span> <br>
                      <span class="text-muted ">{{'Tel: '+item.n_contacto}}</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
           
            <div class="mb-5">
              <div class="cart">
                <div class="cart-wrapper">
                  <div class="cart-header text-center ">
                    <div class="row">
                      <div class="col-6">
                        <span class="text-left">Producto</span>
                      </div>
                      <div class="col-2">Precio</div>
                      <div class="col-2">Cantidad</div>
                      <div class="col-2">Total</div>
                    </div>
                  </div>
                  <div class="cart-body">
                    <!-- Product-->
                    <div class="" v-for="item in productos" >
                      <div class="row d-flex align-items-center text-center">
                        <div class="col-6">
                          <div class="d-flex align-items-center"><a href="detail.html"><img class="cart-item-img" :src="$url+'/obtener_portada_producto/'+item.producto.portada"  alt="..."></a>
                            <div class="cart-title text-start"><a class="text-uppercase text-dark" href="detail.html"><strong>{{item.producto.nombre.substr(0,20)}}</strong></a><br><span class="text-muted text-sm">Talla: {{ item.variedad.talla }}</span><br><span class="text-muted text-sm">Color: {{ item.variedad.color }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-2">{{ convertCurrency(item.producto.precio) }}</div>
                        <div class="col-2">{{ item.cantidad }}
                        </div>
                        <div class="col-2 text-center">{{ convertCurrency(item.producto.precio*item.cantidad) }}</div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-5 d-flex justify-content-between flex-column flex-lg-row"><router-link class="btn  btn-dark" to="/detalles_carrito"> <i class="fa fa-angle-left me-2" ></i>Regresar al carrito</router-link><a class="btn btn-dark" href="checkout5.html">Generar la orden<i class="fa fa-angle-right ms-2"></i></a></div>
          </div>
          <div class="col-lg-4">
            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0"><b>Tu orden</b></h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p class="text-sm">El costo del envio puede variar dependiendode Codigo postal.</p>
                <ul class="order-summary mb-0 list-unstyled">
                  <li class="order-summary-item"><span>Subtotal: </span><span class="ms-6">{{ convertCurrency(total) }}</span></li>
                  <li class="order-summary-item"><span>Envio:</span><span class="ms-6">{{ convertCurrency(envio) }}</span></li>
               
                  <li class="order-summary-item border-0"><span>Total:</span><strong class="order-summary-total ms-6 " >{{ convertCurrency(total+envio) }}</strong></li>
                </ul>
              </div>
            </div>

            <div class="block mb-5" >
              <div class="block-header">
                  <h6 class="text-uppercase mb-0"><b>Método de pago </b></h6>
              </div>
              <div class="block-body bg-light pt-1 mb-3">
                  <div class="col-md-12 mb-2">
                   
                    <span class="d-block  mb-2" style="letter-spacing: 0px;font-weight: 600;">Tarjeta de crédito o débito</span>
                      <div class="row">
                          <div class="col-12 mb-2">
                              <img style="width: 180px">
                          </div>
                          <div class="col-12">
                              <p class="text-muted" style="font-size: 13px">
                                  (Luego de hacer clic en "PAGAR" será redirigido a Mercado Pago  de forma segura para completar su compra).</p>
                          </div>
                      </div>
                  </div>
                  
               
  
                  <div class="col-md-12">
                      <p class="text-sm" style="margin-bottom: 0.4rem;">Deberes e impuestos no están incluidos en paquetes con envio internacional. /Tus datos personales serán utilizados para procesar tu pedido y respaldar tu experiencia en este sitio web.</p>
                      <a > <b> Términos & Privacidad.</b></a>
                  </div>
  
              </div>
              <div class="block-footer">
                <a  class="btn btn-dark" id="btnBuy" style="cursor:pointer;width: 100%;" v-on:click="mecadopago() ">PAGAR</a>
               <!--  <button class="btn btn-dark btnBuy" style="cursor: pointer" disabled>Procesando...</button> -->
               
              </div>
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
  name: 'pagoCartApp',
  data(){
    return{
      direcciones:[],
      productos:[],
      total: 0,
      envio: 1,
      load_data: true,
      venta:{},
      items: []
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
            this.items.push({
              id: item.producto._id,
              title: item.producto.nombre,
              quantity: item.cantidad,
              currency_id: 'MXN',
              unit_price: item.producto.precio,
            })
          }
          this.productos = result.data.cart_general
          this.load_data = false
        }); 
      }
    },
    convertCurrency(number){
          return currencyFormatter.format(number,{code:'MXN'})
    },
    init_direcciones(){
      axios.get(this.$url + "/obtener_direccion_cliente",{
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        }).then((result)=>{
          this.direcciones = result.data.direccion
        })
    },
    seleccionar_direccion(event){
      this.venta.direccion = event.target.value
    },
    mecadopago(){
      let data = {
        back_urls: {
          success: 'https://nishinashop.onrender.com/validation/success',
          pending: 'https://nishinashop.onrender.com/validation/pending',
          failure: 'https://nishinashop.onrender.com/validation/failure'
        },
        items: this.items, 
        auto_return: 'approved',
      }
      axios.post('https://api.mercadopago.com/checkout/preferences',data,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TEST-7802715175959909-050803-6580fa6051eed313c72af5b01407940f-2426338693'
        }
      }).then((result)=>{
        window.location.href = result.data.sandbox_init_point
      }).catch((error) => {
  console.error("Error detallado:", {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });
});
    
    }
  },
  beforeMount(){
    this.init_carrito()
    this.init_direcciones()
  }
}

</script>
