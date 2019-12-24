import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{
      pn:'',
      pnmask:'138****7383'
    }
  },
  mutations: {
    UPDATE_USERINFO(state,user_info){
      return state.userinfo = user_info;
    }
  },
  actions: {
  },
  modules: {
  }
})
