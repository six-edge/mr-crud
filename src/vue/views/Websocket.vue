<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12 sm12 md12 shrink>
                <v-card class="elevation-12 padding-top">

                    <v-text-field
                        @keyup.enter="sendMessage"
                        v-model="outgoingMessage"
                        label="Message"
                    ></v-text-field>

                    <v-layout justify-space-between>
                        <v-btn color="info" @click="sendMessage">Send</v-btn>
                        <v-btn 
                            v-if="isConnected" 
                            color="success" 
                            small
                            flat 
                        >Connected</v-btn>  
                        <v-btn 
                            v-else 
                            color="error" 
                            small
                            flat
                        >Disconnected</v-btn>
                    </v-layout>

                </v-card>
            </v-flex>
        </v-layout>
        <v-spacer class="margin-top"/>
        <v-layout row >
            <v-flex xs12 sm12 md12 shrink>
                <v-card class="elevation-12 padding-bottom">

                    <v-text-field
                        v-model="incomingMessage"
                        label="Response"
                        :disabled="true"
                    ></v-text-field>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            outgoingMessage: ''
        }),

        props: {
            source: String
        },

        methods: {
            sendMessage() {
                this.$socket.send(this.outgoingMessage)
                this.outgoingMessage = ''
            }
        },

        computed: {
            isConnected() {
                return this.$store.state.socket.isConnected
            },
            incomingMessage() {
                return this.$store.state.socket.message.data
            }
        }
    }
</script>

<style>
.padding-top {
    padding: 1rem 2rem 1.6rem 
}
.padding-bottom {
    padding: 1.6rem 2rem 1rem 
}
.margin-top {
    margin-top: 2rem
}
</style>