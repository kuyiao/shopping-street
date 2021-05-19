// 首页的网络请求
// 使用网络请求模块,请求数据并到出
// 导入axios 的封装函数request
import { request } from './request'
import { requests } from './request'

//对request函数进行再次封装 获取首页的所有数据,然后导出
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

//  首页相关商品的数据   type具体的数据类型比如:pop(流行的数据)  page页数
export function getHomeGoods(type, page) {
    return requests({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}