<template>
    <div class="mt-5"> 
      <section class="product-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 pt-4 order-2 order-lg-1 ms-6" >
            <div class="row">   
              <div class="d-none d-md-block col-md-2 pe-0">
    <!-- Miniaturas -->
    <div>
        <button v-for="(img, index) in galeria" 
                :key="index" 
                @click="galeria.unshift(galeria.splice(index, 1)[0])">
            <img class="img-fluid" 
                 :src="$url+'/obtener_galeria_producto/'+img.imagen" 
                 :alt="'Miniatura '+(index+1)">
        </button>
    </div>
</div>
              

              <div class="col-12 col-md-10 detail-carousel">
    <div class="ribbon ribbon-info">Nuevo</div>
    <div class="ribbon ribbon-warning">Oferta</div>
    
    <!-- Contenedor principal (SOLO UNO) -->
    <div class="main-image-viewer">
        <!-- Mostrar solo la imagen actual según índice -->
        <div v-if="galeria[0]">
            <a class="glightbox" 
               :href="$url+'/obtener_galeria_producto/'+galeria[0].imagen" 
               data-title="Modern Jacket 1 - Caption text" 
               data-gallery="product-gallery">
                <img class="img-fluid" 
                     :src="$url+'/obtener_galeria_producto/'+galeria[0].imagen" 
                     alt="Modern Jacket 1">
            </a>
        </div>
    </div>
</div>
            </div>
          </div>
          <div class="text-start col-lg-4 ps-lg-4 order-1 order-lg-2">
            
            <h4 class="mt-4 mb-4">{{ producto.nombre }}</h4>
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul class="list-inline-item mb-2 mb-sm-0">
                <li class="list-inline-item h4 fw-light mb-0">{{ convertCurrency(producto.precio) }}</li>
                
              </ul>
              <div class="d-flex align-items-center">
                <ul class="list-inline-item me-2 mb-0">
                  <li class="list-inline-item me-0"><i class="fa fa-star text-gray-300"></i></li>
                  <li class="list-inline-item me-0"><i class="fa fa-star text-gray-300"></i></li>
                  <li class="list-inline-item me-0"><i class="fa fa-star text-gray-300"></i></li>
                  <li class="list-inline-item me-0"><i class="fa fa-star text-gray-300"></i></li>
                  <li class="list-inline-item me-0"><i class="fa fa-star text-gray-300"></i></li>
                </ul><span class="text-muted text-uppercase text-sm">0 reviews</span>
              </div>
            </div>
            <p class="text-start mb-4 text-muted">Categoria: {{ producto.categoria }} <br> Genero: {{ producto.genero }}</p>
            <div class="row">
                <div class="text-start col-sm-6 col-lg-12 detail-option mb-3">
                  <h6 class="detail-option-heading mb-2">talla <span>(requerido)</span></h6>
                  <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" :id="'variedad_'+item._id" :for="'variedad_'+item._id" v-for="item in variedad" v-on:click="getVariedad(item._id)"> {{item.color+'-'+item.talla }}
                    <input class="input-invisible" type="radio" name="size" :value="item._id" :id="'variedad_'+item._id" required>
                  </label>
                </div>
                <div class="col-12 col-lg-6 detail-option mb-5">
                  <label class="detail-option-heading fw-bold">Cantidad <span>(requerido)</span></label>
                  <input class="form-control detail-quantity" name="items" type="number"  v-model="obj_carrito.cantidad">
                </div>
              </div>
              <ul class="list-inline">
                <li class="list-inline-item">
                  <button class="btn btn-dark btn-lg mb-1" type="button" v-on:click="add_cart()"> <i class="fa fa-shopping-cart me-2" ></i>Agregar al carrito</button>
                </li>                
              </ul>
              <span class="text-danger ms-5" v-if="msn_error">{{ msn_error }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-5">
      <div class="container">
        <ul class="nav nav-tabs flex-column flex-sm-row" role="tablist">
          <li class="nav-item"><a class="nav-link detail-nav-link active" data-bs-toggle="tab" href="#description" role="tab">Descripcion</a></li>
          <li class="nav-item"><a class="nav-link detail-nav-link" data-bs-toggle="tab" href="#additional-information" role="tab">Guia de tallas</a></li>
          <li class="nav-item"><a class="nav-link detail-nav-link" data-bs-toggle="tab" href="#reviews" role="tab">Reseñas</a></li>
        </ul>
        <div class="text-start tab-content py-4">
          <div class="tab-pane active px-3" id="description" role="tabpanel">
            <p class="text-muted">{{producto.descripcion}}</p>
            
          </div>
          <div class="tab-pane" id="additional-information" role="tabpanel">
            <div class="row">
              <div class="col-lg-6">
                <table class="table text-sm">
                  <tbody>
                    <tr>
                      <th class="text-uppercase fw-normal border-0">Product #</th>
                      <td class="text-muted border-0">Lorem ipsum dolor sit amet</td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Available packaging</th>
                      <td class="text-muted ">LOLDuis aute irure dolor in reprehenderit</td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Weight</th>
                      <td class="text-muted ">dolor sit amet</td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Sunt in culpa qui</th>
                      <td class="text-muted ">Lorem ipsum dolor sit amet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6">
                <table class="table text-sm">
                  <tbody>
                    <tr>
                      <th class="text-uppercase fw-normal border-0">Weight</th>
                      <td class="text-muted border-0">dolor sit amet                                </td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Sunt in culpa qui</th>
                      <td class="text-muted ">Lorem ipsum dolor sit amet                                </td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Product #</th>
                      <td class="text-muted ">Lorem ipsum dolor sit amet                                </td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal ">Available packaging</th>
                      <td class="text-muted ">LOLDuis aute irure dolor in reprehenderit                                </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="reviews" role="tabpanel">
            <div class="row mb-5">
              <div class="col-lg-10 col-xl-9">
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-1.jpg" alt="Han Solo"><span class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Han Solo</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i>
                    </div>
                    <p class="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections     </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-2.jpg" alt="Luke Skywalker"><span class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Luke Skywalker</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                    </div>
                    <p class="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. &quot;What's happened to me?&quot; he thought. It wasn't a dream.     </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-3.jpg" alt="Princess Leia"><span class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Princess Leia</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-gray-200"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                    </div>
                    <p class="text-muted">His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table.     </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-4.jpg" alt="Jabba Hut"><span class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Jabba Hut</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i>
                    </div>
                    <p class="text-muted">Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.     </p>
                  </div>
                </div>
                <div class="py-5 px-3">
                  <h5 class="text-uppercase mb-4">Leave a review</h5>
                  <form class="form" id="contact-form" method="post" action="contact.php">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="name">Your name *</label>
                          <input class="form-control" type="text" name="name" id="name" placeholder="Enter your name" required="required">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="rating">Your rating *</label>
                          <select class="custom-select focus-shadow-0" name="rating" id="rating">
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                            <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                            <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                            <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="email">Your email *</label>
                      <input class="form-control" type="email" name="email" id="email" placeholder="Enter your  email" required="required">
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="review">Review text *</label>
                      <textarea class="form-control" rows="4" name="review" id="review" placeholder="Enter your review" required="required"></textarea>
                    </div>
                    <button class="btn btn-outline-dark" type="submit">Post review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5">
      <div class="container">
        <header class="text-center">
          <h6 class="text-uppercase mb-5">recomendaciones</h6>
        </header>
        <div class="row">
          <!-- product-->
          <div class="col-lg-2 col-md-4 col-6" v-for="item in nuevos_producto">
            <div class="product" >
              <div class="product-image">
                <div class="ribbon ribbon-info">Nuevo</div><img class="img-fluid" :src="$url+'/obtener_portada_producto/'+item.portada" alt="product"/>
                <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="detail.html"></a>
                  <div class="product-hover-overlay-buttons"><router-link class="btn btn-dark btn-buy" :to="{name: 'detalles_producto',params:{slug: item.slug}}"><i class="fa-search fa"></i><span class="btn-buy-label ms-2">ver</span></router-link>
                  </div>
                </div>
              </div>
              <div class="py-2">
                <p class="text-muted text-sm mb-1">{{ item.categoria }}</p>
                <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="detail.html">{{ item.nombre }}</a></h3><span class="text-muted">{{ convertCurrency(item.precio) }}</span>
              </div>
            </div>
          </div>
          <!-- /product-->
        </div>
      </div>
    </section>
    </div>
    
</template>
<style>
.bg_variedad{
  background: black !important;
  color: white !important;
}
</style>
<script>
import axios from 'axios'
var currencyFormatter = require ('currency-formatter');
import $ from 'jquery'


export default {
  name: 'detallesProductoApp',
  data(){
    return{
      galeria:[],
      producto: [],
      nuevos_producto: [],
      variedad: [],
      obj_carrito: {
        cantidad: 1,
      },
      msn_error: '',
      user_data : JSON.parse(this.$store.state.user)
    }
  },
    methods:{
    init_data(){
      axios.get(this.$url+'/obtener_slug_producto/'+this.$route.params.slug,{
        headers: {
          'Content-type': 'application/json'
        }
      }).then((result)=>{
        this.galeria= result.data.galery
        this.producto = result.data.product
        this.variedad = result.data.variety
        console.log(this.variedad)
        this.obj_carrito.producto = this.producto._id
        this.obj_carrito.cliente = this.user_data._id
      })
    },
    convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
    },
    init_nuevos_productos(){
      axios.get(this.$url+'/obtener_ultimos_productos',{
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((result)=>{
        
        this.nuevos_producto = result.data
        console.log(this.nuevos_producto)
      }).catch((error) => {
    console.error("Error completo:", error)
      });
    },
   getVariedad(value){
      this.obj_carrito.variedad = value
      setTimeout(()=>{
        $('.detail-option-btn-label').removeClass('bg_variedad')
        $('#variedad_'+value).addClass('bg_variedad')
      }, 50)
      
    },
    upload_cart(){
      axios.post(this.$url+'/agregar_al_carrito',this.obj_carrito,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        console.log(result)
        this.$socket.emit('send_cart', true)
      })
    },
    add_cart(){
      if(!this.obj_carrito.variedad){
        this.msn_error = 'Seleccione una variedad'
      }else if(!this.obj_carrito.cantidad){
        this.msn_error = 'ingrese una cantidad'
      }else if(this.obj_carrito.cantidad <= 0){
        this.msn_error = 'ingrese una cantidad valida'
      }else{
        this.msn_error = ''
        console.log(this.obj_carrito)
        this.upload_cart()
      }
      
    }
  }, 
  beforeMount(){
    this.init_data()
    this.init_nuevos_productos()
  }
}
</script>
