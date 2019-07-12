import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import goods from './modules/goods'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    user,
    goods
  }
})

export default store

