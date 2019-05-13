<template>

    <v-layout text-xs-center wrap>
      
      <v-flex> 
        
        <div v-if="user">
          <img id="avatar" :src="user.avatarUrl">
          <p>Hello {{ user.displayName }}</p>
        </div>

        <div v-else>
          <div class="emoji">{{ emoji }}</div>
          <p>{{ msg }}</p>
        </div>

      </v-flex>

    </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    props: {
      msg: String,
      emoji: String
    },
    computed: mapState([
      'user'
    ])
  }
</script>

<style>
.emoji {
  font-size: 10rem
}
#avatar {
  width: 6rem
}
</style>
