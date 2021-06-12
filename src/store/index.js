import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    images: [],
    page: 1,
    pageCount: 1
  },
  mutations: {
    setAuthToken (state, token) {
      state.token = token
    },
    setImages (store, images) {
      store.images.length = 0
      store.images.push(...images.pictures.map(({ id, cropped_picture }) => ({ id, src: cropped_picture })))
      store.page = images.page
      store.pageCount = images.pageCount
    }
  },
  actions: {
  },
  modules: {
  }
})
