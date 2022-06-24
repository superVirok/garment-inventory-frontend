import {createStore} from 'vuex'

export default createStore({
    state: {
      bid:null,
      mid:null,
    },
    mutations: {
      bar(state,id){
          state.bid = id
      },
      lmenu(state,id){
          state.mid = id
      }
    },
    actions: {
    },
    modules: {
    }
  })