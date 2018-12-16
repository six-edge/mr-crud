<template>

    <v-layout text-xs-center wrap>
      
      <v-flex> 
        
        <div class="emoji">{{ emoji }}</div>
        <div>{{ msg }}</div>
      
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
      debug: true
    })
  }
</script>

<style>
.emoji {
  font-size: 10rem
}
</style>
