import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPage: false
  },
  mutations: {
    SET_SHOW_PAGE (state, data) {
      state.showPage = data
    }
  },
  actions: {

  },
  getters: {
    showPage (state) {
      return state.showPage
    }
  }
})
