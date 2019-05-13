<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12 padding" width="700">
                    
                    <pre>{{ getDebug() }}</pre>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    export default {
        data: () => ({
            drawer: true,
            session: {}
        }),

        props: {
            source: String
        },

        computed: mapState([
            'user'
        ]),

        methods: {
            getSession() {
                axios.get('/session')
                    .then(response => {
                        // handle success
                        // eslint-disable-next-line
                        console.log(response.data)
                        this.session = response.data
                    })
                    .catch(error => {
                        // handle error
                        // eslint-disable-next-line
                        console.log(error)
                    })
            },
            getDebug() {
                const debug = {
                    session: this.session,
                    user: this.user
                }
                return JSON.stringify(debug, null, 4)
            }
        },
        created: function() {
            this.getSession()
        }
    }
</script>

<style>
.padding {
    padding: 1rem
}
</style>