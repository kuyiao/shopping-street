// 导入方法名
import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'


export default {
    // context 默认参数 上下文
    addCart(context, payload) { //state
        // 当我们开发中有异步操作时,就可以给异步操作包装一个Promise  resolve成功时调用  reject失败时调用
        return new Promise((resolve) => { //,reject
            // state.cartList.push(payload)
            // 数组常用的方法有哪些： push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
            /* // payload新添加的商品
            // 数组常用的方法有哪些：
            let oldProduct = null;
            for (let item of state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item;
                }
            } */
            // let index = state.cartList.indexOf(payload)

            // 1.判断商品是否重复(查找之前的商品中是否有该商品),重复的商品数据赋值给oldProduct变量
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct如果有值商品就是重复的商品的件数+1,否则件数为1
            if (oldProduct) {
                // 把符合条件元素中的count(件数)+1
                // oldProduct.count += 1
                // 把符合条件的数据,传给mutations里的addCounter方法,因为在mutations里的数据可以跟踪它的变化

                //oldProduct
                // let oldProduct = state.cartList[index]
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve("当前的商品数量+1") //一旦调用了resolve函数就会执行下一步(then)
            } else { //添加新的商品
                // 第一次加入购物车时添加count并且把count(件数)赋值为1
                payload.count = 1
                    // 把商品数据payload追加给state属性里的cartList数组
                    // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })

    }
}