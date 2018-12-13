<template>

    <v-layout text-xs-center wrap>
      
      <v-flex> 
        
        <img alt="Vue logo" src="../assets/logo.png">
        <div>{{ msg }}</div>
      
      </v-flex>

    </v-layout>
</template>

<script>
  export default {
    props: {
      msg: String
    },
    data: () => ({
      debug: true
    })
  }
</script>

<style>

</style>
