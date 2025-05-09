import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user_data')
  },
  getters: {
  },
  mutations: {
    setToken(state,token){
    state.token = token;
    },
    setUser(state,user){
      state.user = user;
      }
  },
  actions: {
    saveToken({commit},token){
      commit('setToken', token);
      localStorage.setItem('token',token)
    },
    saveUser({commit},user){
      commit('setUser', user);
      localStorage.setItem('user_data',user)
    },
    logout({commit}){
      commit('setToken', null)
      localStorage.clear()
    }

  },
  modules: {
  }
})
