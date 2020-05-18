import Vue from 'vue'
import Vuex from 'vuex'

// namespaced module
import layout from './modules/layout';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    layout
  }
})
