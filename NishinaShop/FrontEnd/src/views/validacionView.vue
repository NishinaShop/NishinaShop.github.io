<template>
  <div>
    <section class="hero " v-if="estado == 'pending' || estado == 'failure'">
      <div class="container mt-5">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h3 class="mb-5">Pago incorrecto</h3>
          <div class="row">  
            <p class="lead mb-0">As am hastily invited settled at limited civilly fortune me. 
                Really spring in extent an by. Judge but built party world. Of so am he remember
                 although required. Bachelor unpacked be advanced at. Confined in declared 
                 marianne is vicinity. </p>
                </div> 
          </div>
        </div>
</section>
<section class="hero" v-if="!msn_error">
      <div class="container mt-5" v-if="pago.status == 'approved'">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h3 class="mb-5">Validando pago...</h3>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2">
              <img src="../../public/assets/img/loadingPay.gif" style="width: 80px;">
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5" v-if="msn_error">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h3 class="mb-5">{{msn_error}}</h3>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2">
              <p class="lead mb-0">Consulta con tu banco detalles del pago declinado</p>
          </div>
        </div>
      </div>
    </div>
</section>
  </div>
</template>
<script>
import axios from 'axios'
import { registerRuntimeCompiler } from 'vue'
export default{
  name: 'validacionView',
  data(){
    return{
      estado:'',
      payment_id: '',
      pago:{},
      direccion: '',
      msn_error: '',
      venta: {},
      detalles: [],
      total: 0,
      carrito: [],
      envio: 1
    }
  },
  beforeMount(){
    this.estado = this.$route.params.estado 
    this.payment_id = this.$route.query.payment_id

    let user_data = JSON.parse(this.$store.state.user)
    this.init_carrito()

    this.venta.transaccion = this.payment_id
    this.venta.envio = this.envio
    this.venta.cliente = user_data._id
    if(this.$route.params.direccion){
    this.direccion = this.$route.params.direccion
    this.venta.direccion = this.direccion
    }else{
      this.msn_error = 'No se obtuvo el codigo de la direccion'
    }
    this.init_payment(this.payment_id)
  },
  methods:{
    init_carrito() {
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
            this.detalles.push({
              subtotal: subtotal,
              precio_unida: item.producto.precio,
              cantidad: item.cantidad,
              cliente: this.venta.cliente,
              producto: item.producto._id,
              variedad: item.variedad._id
            })
          }
          this.venta.total = this.total
          this.carrito = result.data.cart_general
          
        }); 
    },
    validad_venta(payment_id){
        axios.get(this.$url+'/validar_payment_id_venta/'+this.payment_id,{
          headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
        }).then((result)=>{
          if(result.data.length >= 1){
            this.msn_error = 'El pago ya fue asignado a otra venta'
          }else if(result.data.length == 0){
            this.crear_compras()
          }
        })
    },
    crear_compras(){
      this.venta.detalles = this.detalles
      axios.post(this.$url+'/crear_venta_cliente',this.venta,{
          headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
        }).then((result)=>{
          this.$socket.emit('send_cart',true)
          this.$router.push({name: 'venta_detalle',params:{id:result.data.id}})
        })
    },
    init_payment(payment_id){
        axios.get('https://api.mercadopago.com/v1/payment/'+payment_id,{
          headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TEST-7802715175959909-050803-6580fa6051eed313c72af5b01407940f-2426338693'
        }
        }).then((result)=>{
          console.log(result.data)
          this.pago = result.data
          if(this.pago.status == 'approved'){
            this.validar_venta(this.payment_id)
          }else{
            this.msn_error = 'El pago no fue aprovado'
          }
        })
    }
  }
}
</script>
