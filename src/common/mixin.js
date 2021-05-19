// 混入 可以存放生命周期函数
// 导入防抖函数
import { debounce } from "common/utils"
// 返回顶部按钮
import BackTop from "components/content/backTop/BackTop";

// import { BACK_POSITION } from "common/const";
export const itemListenerMixin = {
    data() {
        return {

            // 保存监听详情页和首页的图片加载的事件
            itemImgListener: null
        }
    },
    // 组件被挂载完调用
    mounted() {
        // 1.图片加载完成的事件监听
        //this.$refs.scroll.refresh 把refresh 函数传过出(没有调用)
        //  debounce 使用防抖函数
        let newRefresh = debounce(this.$refs.scroll.refresh, 100);

        // 保存监听详情页的图片加载的事件
        this.itemImgListener = () => {
                newRefresh();
            }
            // 刷新一下滚动的数据  this.$bus.$on 接收事件总线的事件
        this.$bus.$on("itemImgLoad", this.itemImgListener);
        // console.log('我是混入中的内容');
    },
}

// 返回顶部的函数
export const backTopMixin = {
    components: {
        BackTop,
    },
    data() {
        return {
            // 控制是否要显示返回顶部的组件
            isShowBackTop: false,
        }
    },
    methods: {
        // 返回顶部按钮
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
        // 返回顶部按钮是否显示
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y >= 1000
        }
    },
}