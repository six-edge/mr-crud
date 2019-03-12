<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12" width="309">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>
                            <svg height="32" class="octicon-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                                <path fill-rule="evenodd" fill="white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            <div class="pl-3 pb-2 d-inline-block">Login with GitHub</div>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn href="/auth/github" @click="authenticate" color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            drawer: true
        }),

        props: {
            source: String
        },

        methods: {
            authenticate() {
                // eslint-disable-next-line
                console.log('-----> Login Start')

                // axios.get('/auth/github')
                //     .then(function (response) {
                //         // handle success
                //         // eslint-disable-next-line
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         // handle error
                //         // eslint-disable-next-line
                //         console.log(error);
                //     })
                //     .then(function () {
                //         // always executed
                //         // eslint-disable-next-line
                //         console.log('-----> Login Finished')
                //     });
            }
        }
    }
</script>

<style>
.octicon-github {
    position: relative;
    top: 7px;
}
</style>