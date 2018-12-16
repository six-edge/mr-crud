<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" mobile-break-point="800" clipped fixed app>
      <v-list dense>
        <v-list-tile v-for="item in menu" :key="item.route" @click="goto(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><span class="font-weight-light"> Mr. CRUD 😎</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!loggedIn" flat @click="goto('login')">Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>

            <router-view/> <!-- Router Target -->
           
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
   
        <span class="ml-3">Made with <span class="red--text">❤</span> using Vuetify</span>
     
    </v-footer>
  </v-app>
</template>

<script>
import menu from './menu'

export default {
  name: 'App',
  data: () => ({
    drawer: true,
    loggedIn: false,
    menu: menu
  }),
  methods: {
    log(msg) {
      // eslint-disable-next-line
      console.log(msg)
    },
    goto(routeName, params) {
      this.$router.push({ name: routeName, params: params ? params : {}})
    }
  }
}

</script>