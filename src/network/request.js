// axios 网络请求模块
import axios from 'axios'

// 导出request函数
export function request(config) {
    //  1.创建axios的实例
    const instance = axios.create({
        // method: 'get', 不写默认就是get请求
        // 配置URL
        baseURL: 'http://123.207.32.32:8000',
        // 配置请求的超时时间
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
            return config
        }, err => {
            // 请求失败时来到这里
            console.log(err);
        })
        // 2.2.响应拦截
    instance.interceptors.response.use(res => {
            // console.log(res);
            // 拦截返回指定的数据
            return res.data
        }, err => {
            console.log(err);
        })
        // console.log(config);
        //  发送真正的网络请求 这里相当于返回Promise
    return instance(config)
}

// 导出requests函数 首页具体商品的接口
export function requests(config) {
    //  1.创建axios的实例
    const instances = axios.create({
        // method: 'get', 不写默认就是get请求
        // 配置URL
        baseURL: 'http://152.136.185.210:7878/api/m5',
        // 配置请求的超时时间
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1 请求拦截的作用
    instances.interceptors.request.use(config => {
            return config
        }, err => {
            // 请求失败时来到这里
            console.log(err);
        })
        // 2.2.响应拦截
    instances.interceptors.response.use(res => {
            // console.log(res);
            // 拦截返回指定的数据
            return res.data
        }, err => {
            console.log(err);
        })
        // console.log(config);
        //  发送真正的网络请求 这里相当于返回Promise
    return instances(config)
}