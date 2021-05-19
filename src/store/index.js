// 状态管理文件  安装vuex npm install vuex --save
import Vue from 'vue'
import Vuex from 'vuex'

// 导入分离之后的mutations、actions
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
    // cartList:[商品1,商品2,商品3...]
    cartList: []
}

export default new Vuex.Store({
    // 属性
    state,
    // 方法 用commit 提交
    // mutations唯一的目的就是修改state中的状态,mutations中的每一个方法完成的事件比较单一,但是在mutations中方法可以实时跟踪它的数据变化
    mutations,
    // 异步 用dispatch 提交
    actions,
    // 类似计算属性
    getters,
    modules: {}
})