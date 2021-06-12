<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          @click="logout()"
          class="ml-auto"
          color="#456806"
          elevation="2"
          depressed
          rounded
          outlined
          x-large
        >
          Logout
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="({ id, src }) in images" :key="id" cols="12" md="6" lg="3">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
        <v-img
          :src="src"
          height="250"
        ></v-img>

          <v-card-actions>
            <v-btn
              @click="lookImage(id)"
              class="mx-auto"
              color="#456680"
              elevation="2"
              block
              depressed
              rounded
              outlined
              x-large
            >
              More info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="mx-4"></v-divider>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="12">
        <einapage
          v-on:setPage="loadImages"
          :currentrows="images.length"
          :currentpage="page"
          overlayclass="text-center mx-auto"
          :pagecount="pageCount"
        >
          <template v-slot:details="data">
            <slot
              name="details"
              :currentrows="data.currentrows"
              :currentpage="data.currentpage"
              :pagecount="data.pagecount"
            >
            Showing
            {{ images.length }}
            rows in the page
            {{ page }}
            of
            {{ pageCount }}.
            </slot>
          </template>
        </einapage>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Einapage from 'einapage-vue'
import { TOKEN_REFERENCE } from '@/data'

export default {
  name: 'Images',
  components: {
    Einapage
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    images () {
      return this.$store.state.images
    },
    page () {
      return this.$store.state.page
    },
    pageCount () {
      return this.$store.state.pageCount
    }
  },
  methods: {
    loadImages (page = this.$store.state.page) {
      this.$dependencies.neysla.images.get({
        headers: { Authorization: `Bearer ${this.token}` },
        params: { page }
      }).then(({ data }) => this.$store.commit('setImages', data))
    },
    lookImage (id) {
      this.$router.push({ name: 'Picture', params: { id } })
    },
    logout () {
      this.$store.commit('setAuthToken', null)
      window.localStorage.removeItem(TOKEN_REFERENCE)
      this.$router.push({ name: 'Authenticate' })
    }
  },
  mounted () {
    if (!this.images.length) {
      this.loadImages()
    }
  }
}
</script>

<style src="einapage-vue/app/css/einapage.css" />
