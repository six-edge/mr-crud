<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12 sm12 md12 shrink>
                <v-card class="elevation-12 padding-top">

                    <v-text-field
                        @keyup.enter="sendMsg"
                        v-model="outgoingMessage"
                        label="Message"
                    ></v-text-field>

                    <v-layout justify-space-between>
                        <v-btn color="info" @click="sendMsg">Send</v-btn>
                        <v-btn color="success" v-if="$store.state.socket.isConnected" :disabled="true">Connected</v-btn>
                        <v-btn color="error" v-else :disabled="true">Disconnected</v-btn>
                    </v-layout>

                </v-card>
            </v-flex>
        </v-layout>
        
        <v-layout row>
            <v-flex xs12 sm12 md12 shrink>
                <v-card class="elevation-12 padding-bottom">

                    <v-text-field
                        v-model="$store.state.socket.message.data"
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
            sendMsg() {
                this.$socket.send(this.outgoingMessage)
                this.outgoingMessage = ''
            }
        },
    }
</script>

<style>
.padding-top {
    padding: 1rem 2rem 1.6rem 
}
.padding-bottom {
    padding: 1.6rem 2rem 1rem 
}
</style>