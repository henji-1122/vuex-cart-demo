import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

/** vuex插件：
 *  - vuex的插件就是一个函数
 *  - 这个函数接收一个store的参数
 *  - 插件注册完后需要在Store的plugins中注册，所以插件必须在创建Store之前创建
 * */

// vuex插件-存储购物车数据到本地
// 购物车中的数据就是状态，更改状态就需要提交mutation，在所有mutation结束后执行
const myPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  // 注册插件
  plugins: [myPlugin]
})
