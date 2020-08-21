const state = {
  // 购物车中的商品数据
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters = {
  // 单个商品数量
  totalCount (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
  // 单个商品个数
  totalPrice (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0).toFixed(2)
  },
  // 选中商品个数
  checkedCount (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.count
      }
      return sum
    }, 0)
  },
  // 选中商品个数
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.totalPrice
      }
      return sum
    }, 0)
  }
}
const mutations = {
  // 添加商品到购物车
  addToCart (state, product) {
    // 1. cartProducts中没有该商品，将该商品添加到数据，并添加count、isChecked、totalPrice
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
    // 2. cartProducts中已经有该商品，count+1、选中、计算小计
  },
  // 从购物车中删除某个商品
  deleteFromCart (state, prodId) {
    const index = state.cartProducts.findIndex(prod => prod.id === prodId)
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  // 全选/取消全选
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(prod => {
      prod.isChecked = checked
    })
  },
  // 选中/取消选中某个商品
  updateProductChecked (state, { checked, prodId }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    prod && (prod.isChecked = checked)
  },
  // 商品数量改变-修改数量和小计
  updataProduct (state, { count, prodId }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    if (prod) {
      prod.count = count
      prod.totalPrice = count * prod.price
    }
  }
}
const actions = {}

export default {
  // 命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
