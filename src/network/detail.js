// 详情页的网络请求
import { requests } from "./request";
export function getDetail(iid) {
    return requests({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 商品推荐的数据
export function getRecommend() {
    return requests({
        url: '/recommend'
    })
}
// 定义一个类把数据放到里面(因为获取过来的数据很乱我们把这些数据放进类的对象里方便使用)
// 商品相关的文字和图片
export class GoodsInfo {
    // 构造函数,通过new命令生成对象实例,是自动调用该方
    constructor(itemInfo, columns, services) { //json格式对象
        this.title = itemInfo.title //商品名称
        this.desc = itemInfo.desc; //商品的描述
        this.newPrice = itemInfo.price; // 价格范围
        this.oldPrice = itemInfo.oldPrice // 之前价格
        this.discount = itemInfo.discountDesc //优惠
        this.columns = columns //售量 收藏 快递
        this.services = services // 服务 和 图片
        this.realPrice = itemInfo.lowNowPrice; //真实的价格
    }
}

// 店铺相关的文字和图片
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo //店铺的logo
        this.name = shopInfo.name //店铺的名称
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells //店铺的总售量
        this.score = shopInfo.score //店铺商品的介绍
        this.goodsCount = shopInfo.cGoods //全部宝贝
    }
}
// 店铺商品的参数
export class GoodsParam {
    constructor(info, rule) {
        // 注:images可能没有值(某些商品有值)
        this.image = info.images ? info.images[0] : ''; // 图片
        this.info = info.set; // 商品的具体数据
        this.sizes = rule.tables; // 选购的参照表
    }
}