// 导入方法名
import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    // state 默认参数   payload接收传过来的数据
    // addCart(state, payload) {
    //   // 1.判断商品是否重复
    //   // let oldProduct = null;
    //   // for (let item of state.cartList) {
    //   //   if (item.iid === payload.iid) {
    //   //     oldProduct = item;
    //   //   }
    //   // }

    //   // find()该方法主要应用于查找第一个符合条件的数组元素。
    //   // value：当前的数组元素。index：当前索引值。arr：被查找的数组。
    //     let oldProduct = state.cartList.find(value=>value.iid === payload.iid)
    //   // 2.判断oldProduct如果有值商品就是重复的商品的件数+1,否则件数为1
    //   if (oldProduct) {
    //     // 把符合条件元素中的count+1
    //     oldProduct.count += 1
    //   } else {
    //     // 第一次加入购物车时添加count并且把count(件数)赋值为1
    //     payload.count = 1
    //     // 把数据payload传给state属性里的cartList数组
    //     state.cartList.push(payload)
    //   }
    // }


    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较单一一点

    [ADD_COUNTER](state, payload) {
        // 把符合条件元素中的count(件数)+1
        payload.count++
    },

    [ADD_TO_CART](state, payload) {
        // checked 决定当前商品是否选中
        payload.checked = true
            // 把数据payload(商品的就数据)追加给state属性里的cartList数组
        state.cartList.push(payload)
    }
}