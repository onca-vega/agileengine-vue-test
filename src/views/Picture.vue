<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto my-12"
          max-width="70%"
        >
          <v-img
            :src="src"
          ></v-img>

          <v-card-title>Author: {{ author }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-subtitle>Camera: {{ camera }}</v-card-subtitle>
          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="goBack()"
          color="#804566"
          elevation="2"
          depressed
          rounded
          outlined
          x-large
        >
          Go back
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Picture',
  data () {
    return {
      src: null,
      author: null,
      camera: null,
      tags: []
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  methods: {
    loadImage () {
      this.$dependencies.neysla.images.get({
        delimiters: this.$route.params.id,
        headers: { Authorization: `Bearer ${this.token}` }
      }).then(({ data }) => {
        this.src = data.full_picture
        this.author = data.author
        this.camera = data.camera
        this.tags = data.tags.split(' ').filter(el => el)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.loadImage()
  }
}
</script>
