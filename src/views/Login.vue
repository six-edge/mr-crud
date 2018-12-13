<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12" width="309">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title><v-icon dark>lock</v-icon> GitHub Login </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field name="login" label="Login" type="text"></v-text-field>
                            <v-text-field id="password" name="password" label="Password" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),

    props: {
      source: String
    }
  }
</script>
