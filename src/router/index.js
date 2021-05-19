import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载   views 路径别名 相当于src/views
// 导入首页的Home 组件
const Home = () =>
    import ('views/home/Home')
    // 导入购物车的Cart 组件
const Cart = () =>
    import ('views/cart/Cart')
    // 导入个人的Profile 组件
const Profile = () =>
    import ('views/profile/Profile')
    // 导入分类的Category组件
const Category = () =>
    import ('views/category/Category')
    // 导入详情页的Datail组件
const Detail = () =>
    import ('views/detail/Detail')


// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
// 配置路由
const routes = [{
    path: '',
    // 重定向
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, {
    path: '/cart',
    component: Cart
}, {
    path: '/profile',
    component: Profile
}, {
    path: '/category',
    component: Category
}, {
    // 跳转路由时把需要的参数传过去(动态路由的方式)
    path: '/detail/:iid',
    component: Detail
}];
// 创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history',
    //默认的是hash(哈希)模式带有#号 使用H5的history模式这样可以清除路径默认的#号,看起来美观一点
})
router
// 3.导出routes
export default router;