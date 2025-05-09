<template>
  <div>
    <section class="hero">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content  text-center  mb-5">
          <h2 class="text-center fs-1 mt-5 ">Catalogo</h2>
          <div class="row">
            <div class="col-xl-8 offset-xl-2">
              <p class="lead text-muted">
                Se estan mostrando todo el catalogo que tenemos disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <!-- Grid -->
        <div class="products-grid col-xl-8 col-lg-8 order-lg-2">
          <header class="product-grid-header">
            <div class="me-3 mb-3">
              Showing <strong>1-12 </strong>of <strong>158 </strong>products
            </div>
            <div class="me-3 mb-3">
              <span class="me-2">Show</span
              ><a class="product-grid-header-show active" href="#">12 </a
              ><a class="product-grid-header-show" href="#">24 </a
              ><a class="product-grid-header-show" href="#">All </a>
            </div>
            <div class="mb-3 d-flex align-items-center">
              <span class="d-inline-block me-2">Sort by</span>
              <select class="form-select w-auto border-0">
                <option value="orderby_0">Default</option>
                <option value="orderby_1">Popularity</option>
                <option value="orderby_2">Rating</option>
                <option value="orderby_3">Newest first</option>
              </select>
            </div>
          </header>
          <div class="row" >
            <!-- product-->
            <div class="col-xl-4 col-6" v-for=" item in data_catalogo">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-warning " v-if="item.descuento">Descuento</div>
                  <div v-if="!item.estado"></div>
                  <img
                    class="img-fluid"
                    :src="$url+'/obtener_portada_producto/'+item.portada"
                    alt="product"
                  />
                  <div class="product-hover-overlay">
                    <a
                      class="product-hover-overlay-link"
                      href="detail.html"
                    ></a>
                    <div class="product-hover-overlay-buttons">
                      <a
                        class="btn btn-outline-dark btn-product-left d-none d-sm-inline-block"
                        href="#"
                        ><i class="fa fa-shopping-cart"></i></a
                      ><router-link class="btn btn-dark btn-buy"  :to="{name: 'detalles_producto',params:{slug: item.slug}}">
                          <i class="fa-search fa"></i>                            
                          <span class="btn-buy-label ms-2">Ver</span></router-link>
                      <a
                        class="btn btn-outline-dark btn-product-right d-none d-sm-inline-block"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        ><i class="fa fa-expand-arrows-alt"></i
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">{{ item.categoria }}</p>
                  <h3 class="h6 text-uppercase mb-1">
                    <a class="text-dark" href="detail.html">{{ item.nombre }}</a>
                  </h3>
                  <span class="text-muted">{{ convertCurrency(item.precio) }}</span>
                </div>
              </div>
            </div>
            <!-- /product-->

            <!-- /product-->
          </div>
          <!-- Pagination-->
          
        </div>
        <!-- / Grid End-->
        <!-- Sidebar-->
        <div class="sidebar col-xl-3 col-lg-4 order-lg-1 ms-5">
          <div class="sidebar-block px-3 px-lg-0 me-lg-4 ">
            <a
              class="d-lg-none block-toggler"
              data-bs-toggle="collapse"
              href="#categoriesMenu"
              aria-expanded="false"
              aria-controls="categoriesMenu"
              >Product Categories</a
            >
            <div class="expand-lg collapse" id="categoriesMenu">
              <div class="nav nav-pills flex-column mt-4 mt-lg-0" role="menu">
                <div
                  class="sidebar-menu-item mb-2 active"
                  data-bs-toggle="collapse"
                  data-bs-target="#subcategories_0"
                  aria-expanded="true"
                  aria-controls="subcategories_0"
                  role="menuitem"
                >
                  <a class="nav-link active" href="#!"
                    ><span>Jackets</span
                    ><span class="sidebar-badge ms-2">123</span></a
                  >
                </div>
                <div class="collapse show" id="subcategories_0">
                  <div class="nav nav-pills flex-column ms-3">
                    <a class="nav-link mb-2" href="#!">Lorem ipsum</a
                    ><a class="nav-link mb-2" href="#!">Dolor</a
                    ><a class="nav-link mb-2" href="#!">Sit amet</a
                    ><a class="nav-link mb-2" href="#!">Donec vitae</a>
                  </div>
                </div>
                <div
                  class="sidebar-menu-item mb-2"
                  data-bs-toggle="collapse"
                  data-bs-target="#subcategories_1"
                  aria-expanded="false"
                  aria-controls="subcategories_1"
                  role="menuitem"
                >
                  <a class="nav-link" href="#!"
                    ><span>Jeans &amp; chinos</span
                    ><span class="sidebar-badge ms-2">55</span></a
                  >
                </div>
                <div class="collapse" id="subcategories_1">
                  <div class="nav nav-pills flex-column ms-3">
                    <a class="nav-link mb-2" href="#!">Lorem ipsum</a
                    ><a class="nav-link mb-2" href="#!">Dolor</a
                    ><a class="nav-link mb-2" href="#!">Sit amet</a
                    ><a class="nav-link mb-2" href="#!">Donec vitae</a>
                  </div>
                </div>
                <div
                  class="sidebar-menu-item mb-2"
                  data-bs-toggle="collapse"
                  data-bs-target="#subcategories_2"
                  aria-expanded="false"
                  aria-controls="subcategories_2"
                  role="menuitem"
                >
                  <a class="nav-link" href="#!"
                    ><span>Accessories</span
                    ><span class="sidebar-badge ms-2">80</span></a
                  >
                </div>
                <div class="collapse" id="subcategories_2">
                  <div class="nav nav-pills flex-column ms-3">
                    <a class="nav-link mb-2" href="#!">Sit amet</a
                    ><a class="nav-link mb-2" href="#!">Donec vitae</a
                    ><a class="nav-link mb-2" href="#!">Lorem ipsum</a
                    ><a class="nav-link mb-2" href="#!">Dolor</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a
              class="d-lg-none block-toggler"
              data-bs-toggle="collapse"
              href="#sizeFilterMenu"
              aria-expanded="false"
              aria-controls="sizeFilterMenu"
              >Filter by size</a
            >
            <!-- Size filter menu-->
            <div class="expand-lg collapse" id="sizeFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Talla</h6>
              <form class="mt-4 mt-lg-0" action="#">
                <div class="mb-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      id="size0"
                      type="radio"
                      name="size"
                      checked
                    />
                    <label class="form-check-label text-start" for="size0">Small</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      id="size1"
                      type="radio"
                      name="size"
                    />
                    <label class="form-check-label text-start" for="size1">Medium</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      id="size2"
                      type="radio"
                      name="size"
                    />
                    <label class="form-check-label text-start" for="size2">Large</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      id="size3"
                      type="radio"
                      name="size"
                    />
                    <label class="form-check-label text-start" for="size3">X-Large</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a
              class="d-lg-none block-toggler"
              data-bs-toggle="collapse"
              href="#colourFilterMenu"
              aria-expanded="false"
              aria-controls="colourFilterMenu"
              >Filter by colour</a
            >
            <!-- Size filter menu-->
            
          </div>
        </div>
        <!-- /Sidebar end-->
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from "@/components/topHeader.vue";
import bottomFooter from "@/components/footer.vue";
import axios from "axios"
var currencyFormatter = require ('currency-formatter');

export default {
  name: "catalogoApp",
  components: {
    topHeader,
    bottomFooter,
  },
  data(){
    return{
      data_catalogo: []
    }
    
  },
  methods:{
    init_catalogo(){
      axios.get(this.$url+'/obtener_catalogo_publicos',{
        headers:{
          'Content-type': 'application/json'
        }
      }).then((result)=>{
        this.data_catalogo= result.data
        console.log(this.data_catalogo)
      })
    },
    convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
    },

  },
  beforeMount(){
    this.init_catalogo()
  }
};
</script>
