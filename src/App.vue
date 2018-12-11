<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">🙂 Mr. CRUD</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Router Links -->
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      
    </v-toolbar>

    <v-content>
      <router-view/> <!-- Router Target -->
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}

</script>