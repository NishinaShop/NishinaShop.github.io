<template>
  <div >
    <section class="hero">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="mt-6">Direccion</h1>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8 col-xl-9">
            <form action="#">
              <div class="block">
                <!-- Invoice Address-->
                <div class="block-header">
                  <h6 class="text-uppercase mb-0"><b>Nueva direccion</b></h6>
                </div>
                <div class="block-body">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label class="form-label" for="fullname_invoice"><b>Nombre completo</b></label>
                      <input class="form-control" type="text" v-model="direccion.nombre" placeholder="Joe Black" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="street_invoice"><b>Calle</b></label>
                      <input class="form-control" type="text" v-model="direccion.calle"  placeholder="Calle y numero" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="street_invoice"><b>Colonia</b></label>
                      <input class="form-control" type="text" v-model="direccion.colonia"  placeholder="Colonia" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="city_invoice"><b>Ciudad</b></label>
                      <input class="form-control" type="text" v-model="direccion.ciudad"  placeholder="Ciudad" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="zip_invoice"><b>Codigo postal</b></label>
                      <input class="form-control" type="text" v-model="direccion.codigo_postal"  placeholder="Postal code" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="state_invoice"><b>Estado</b></label>
                      <input class="form-control" type="text" v-model="direccion.estado"  placeholder="Estado" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="emailaddress_invoice"><b>email de contacto</b></label>
                      <input class="form-control" type="text" v-model="direccion.email"  placeholder="joe.black@gmail.com" >
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="phonenumber_invoice"><b>Numero de contacto</b></label>
                      <input class="form-control" type="text" v-model="direccion.n_contacto"  placeholder="Numero de telefono" >
                    </div>
                  </div>
                  <!-- /Invoice Address-->
                </div>
                <!-- Shippping Address-->
                
              </div>
              <div class="mb-4 mt-3 text-center">
                <button class="btn btn-dark" type="button" v-on:click="crear_direccion()"><i class="far fa-save me-2"></i>Guardar direccion</button>
              </div> 
              <div class="text-center" v-if="msn_error">
                <span class="text-danger">{{ msn_error }}</span>
              </div>
            </form>
            <table class="table table-striped mt-6">
  <thead class="table-dark">
    <tr>
      <th scope="col">Nombre/Tel.</th>
      <th scope="col">Direccion</th>
      <th scope="col">Ciudad/Estado</th>
      <th scope="col">Email</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in list_direcciones">
      <th scope="row"><small>{{ item.nombre }}</small> <br>
      <small>{{ item.n_contacto }}</small>
      </th>
      <td><small>{{ item.calle }}</small> <br>
        <small>{{ item.colonia+', CP:'+item.codigo_postal  }}</small></td>
      <td><small>{{ item.ciudad }},</small> <br>
        <small>{{ item.estado }}</small></td>
      <td><small>{{ item.email }}</small> <br>
      </td>
      <td> <button class="btn btn-danger btn-sm" v-on:click="eliminar_direccion(item._id)">Eliminar</button></td>
    </tr>
  </tbody>
</table>
          </div>
          <!-- Customer Sidebar-->
          <div class="col-xl-3 col-lg-4 mb-5 ">
            <div class="customer-sidebar card border-0"> 
              <div class="customer-profile"><a class="d-inline-block" href="#"><img class="img-fluid rounded-circle customer-image shadow" src="../../../public/img/avatar-1.png" alt=""></a>
                <h5>Usuario</h5>
                <p class="text-muted text-sm mb-0"></p>
              </div>
              <nav class=" customer-nav"><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#paper-bag-1"> </use>
                    </svg>Ordenes</span>
                  <div class="badge rounded-pill bg-dark fw-normal px-3">0</div></a><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none" ><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#male-user-1"> </use>
                    </svg>Perfil</span></a><a class="active list-group-item d-flex justify-content-between align-items-center text-decoration-none" href="customer-addresses.html"><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#navigation-map-1"> </use>
                    </svg>Direcciones</span></a><a class="list-group-item d-flex justify-content-between align-items-center text-decoration-none" v-on:click=""><span>
                    <svg class="svg-icon svg-icon-heavy me-2">
                      <use xlink:href="#exit-1"> </use>
                    </svg>Cerrar sesión</span></a>
              </nav>
            </div>
          </div> 
          <!-- /Customer Sidebar-->
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'direccionesApp',
  data(){
    return{
      direccion:{},
      msn_error : '',
      list_direcciones:[],
    }
  },
  methods:{
    crear_direccion(){
      if(!this.direccion.nombre){
        this.msn_error = 'Ingresa tu nombre'
      }else  if(!this.direccion.calle){
        this.msn_error = 'Ingresa tu calle'
      }else  if(!this.direccion.colonia){
        this.msn_error = 'Ingresa tu colonia'
      }else  if(!this.direccion.ciudad){
        this.msn_error = 'Ingresa tu ciudad'
      }else  if(!this.direccion.codigo_postal){
        this.msn_error = 'Ingresa tu codigo postal'
      }else  if(!this.direccion.estado){
        this.msn_error = 'Ingresa tu estado'
      }else  if(!this.direccion.email){
        this.msn_error = 'Ingresa tu numero de email'
      }else  if(!this.direccion.n_contacto){
        this.msn_error = 'Ingresa tu numero de contacto'
      }else {
        axios.post(this.$url + "/agregar_direccion_cliente",this.direccion,{
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        }).then((result)=>{
          this.msn_error = ''
          this.direccion = {}
          this.init_direcciones()
        })
      }
      
    },
    init_direcciones(){
      axios.get(this.$url + "/obtener_direccion_cliente",{
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        }).then((result)=>{
          this.list_direcciones = result.data.direccion
          console.log(this.list_direcciones)
        })
    },
    eliminar_direccion(id){
      axios.delete(this.$url + "/eliminar_direccion_cliente/"+id,{
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        }).then((result)=>{
          this.init_direcciones()
        })
    },
  },
  beforeMount(){
    this.init_direcciones()
  }
}
</script>
