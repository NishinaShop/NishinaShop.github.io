<template>
    
  <div id="app"> 
    <topHeader />
  </div>
  <router-view/>
  <bottomFooter />
</template>
<script>
import topHeader from '@/components/topHeader.vue'
import bottomFooter from '@/components/footer.vue'
export default {
  components:{
    topHeader,
    bottomFooter
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
