import Neysla from 'neysla'
import { TOKEN_REFERENCE } from '@/data'

export default function (store) {
  return {
    install (Vue) {
      Vue.prototype.$dependencies = {
        neysla: {
          initEndpoints () {
            const { PUBLIC_API_PATH } = process.env

            return new Neysla()
              .init({ url: PUBLIC_API_PATH, name: 'api', requestType: 'json' })
              .then(({ api }) => {
                this.auth = api.setModel('/auth')
                this.images = api.setModel('/images')
              })
          },
          authenticateApp () {
            const { API_ACCESS_KEY } = process.env

            return this.auth.post({
              body: { apiKey: API_ACCESS_KEY }
            }).then(({ data }) => {
              if (data.auth) {
                store.commit('setAuthToken', data.token)
                window.localStorage.setItem(TOKEN_REFERENCE, data.token)
              }
            })
          },
          auth: null,
          images: null
        }
      }
    }
  }
}
