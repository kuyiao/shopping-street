import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入解决移动端300ms的延迟的插件
import FastClick from 'fastclick'
// 导入懒加载插件
import VueLazyLoad from 'vue-lazyload'

// 导入自定义的toast(弹窗)插件
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 创建一个事件总线 在Vue的prototype(原型)定义$bus把一个Vue的实例赋给他就能实现,在vue的所有组件里共享事件
Vue.prototype.$bus = new Vue()

// 安装自定义的toast(弹窗)插件
Vue.use(toast)

new Vue({
    render: h => h(App),
    // 使用路由
    router,
    // 使用Vuex
    store
}).$mount('#app')

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
    //   CommonJS定义了两个主要概念：
    // require函数，用于导入模块
    // module.exports变量，用于导出模块
    // 加载过程中要显示的东西  require模块化加载
    loading: require('assets/img/common/loading.gif')
})