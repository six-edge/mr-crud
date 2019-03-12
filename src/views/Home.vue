<template>
  <div class="home"> 
    <About msg="I'm Mr. CRUD" emoji="😎" />
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
