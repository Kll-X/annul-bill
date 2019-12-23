import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{
      age11:112,
      pn:3,
      mask:4,
      longi:false
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
