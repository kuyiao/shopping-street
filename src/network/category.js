// 分类页面的网络请求
import {requests} from  "./request";
// 获取文字的数据
export function getCategory(){
  return requests({
    url:'/category',
  }).catch(err => err);
}
// 获取推荐的数据
export function getSubcategory(maitKey) {
  return requests({
    url: "/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}

// 获取图片的数据
export function getCategoryimg(miniWallkey,type){
  return requests({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  }).catch(err => err);
}