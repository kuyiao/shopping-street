// 购物车所需要的数据
export default {
    // 1.顶部导航的商品个数state  默认参数  
    cartLength(state) {
        return state.cartList.length * state.cartList.length
    },
    // 2.购物车模块需要展示的商品数据
    cartList(state) {
        return state.cartList
    }
}