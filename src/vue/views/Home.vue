<template>
  <div class="home"> 
    <About msg="Hello we're the CRUD Family!" emoji="😎👧👱‍♀️" />
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/vue/components/About.vue'

export default {
  name: 'home',
  components: {
    About
  }
}
</script>
