<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Agile Engine Image Gallery</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="authenticateApp"
          color="accent"
          elevation="15"
          depressed
          rounded
          x-large
        >Click me to login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Authenticate',
  methods: {
    authenticateApp () {
      this.$dependencies.neysla.authenticateApp()
        .then(() => this.$router.push({ name: 'Images' }))
    }
  }
}
</script>
