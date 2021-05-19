import Toast from './Toast'

// Vue的obj插件  install 关键字
const obj = {}

// Vue 接收main.js默认传过来的vue实例
obj.install = function(Vue) {
    // console.log(1111111);
    // console.log(Taost.$el);
    // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
    //  document.body.appendChild(Taost.$el)
    // prototype 原型
    // Vue.prototype.$toast = 对象;
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.new的方式,根据组件构造器,可以创建出来一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象,手动的挂载到某个元素上
    // (1).Vue 的$mount()为手动挂载，在项目中可用于延时挂载（例如在挂载之前要进行一些其他操作、判断等）
    // 手动挂载上。new Vue时，el和$mount并没有本质上的不同。
    // (2)document.createElement()是在对象中创建一个对象，要与appendChild() 或insertBefore()方法
    // 联合使用。其中，appendChild()方法在节点的子节点列表末添加新的子节点。insertBefore() 方法在
    // 节点的子节点列表任意位置插入新的节点。
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    // 在文档的末尾添加toast组件内的元素
    document.body.appendChild(toast.$el)

    // 5.将toast组件对象赋值给Vue.prototype(原型)内共享
    Vue.prototype.$toast = toast;
}
export default obj