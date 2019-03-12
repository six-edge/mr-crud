<template>

    <v-layout text-xs-center wrap>
      
      <v-flex> 
        
        <div v-if="user">
          <img :src="user.avatarUrl" id="avatar">
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
  export default {
    props: {
      msg: String,
      emoji: String
    },
    data: () => ({
      debug: true,
      user: JSON.parse(sessionStorage.getItem('user') || false)
    })
  }
</script>

<style>
.emoji {
  font-size: 10rem
}
.avatar{
  width: 6rem
}
</style>
