import axios from 'axios'
const state = {
  // 初始化商品
  products: []
}
const getters = {}
const mutations = {
  // 获取商品数据后修改商品状态
  setProducts (state, payload) {
    state.products = payload
  }
}
const actions = {
  // 异步请求商品数据
  async getProducts ({ commit }) {
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products' // server.js
    })
    console.log(data)
    commit('setProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
