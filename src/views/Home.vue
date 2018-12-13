<template>
  <div class="home"> 
    <About msg="Hello I'm Mr. CRUD 😎"/>
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'

export default {
  name: 'home',
  components: {
    About
  }
}
</script>
