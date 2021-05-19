// 公共的方法
// 进行防抖操作跟节流(筛选器)差不多(就是原来要执行很多次的现在只需一次)func目标函数  
// func目标函数 delay要等待的时间
export function debounce(func, delay = 300) {
    let timer = null;

    // ...args接收多个参数
    return function(...args) {
        //  如果timer不为空就清除之前的定时器
        if (timer) clearTimeout(timer);
        // 开启定时器
        timer = setTimeout(() => {
            //   apply()方法调用一个对象。简单理解为调用函数的方式,但是它可以改变函数的this的指向
            //   语法:fun.apply(thisArg,[argsArray])
            //   thisArg:在运行时指定的this值
            //   argsArray:传递的值,必须包含在数组里面
            //   返回值就是函数的返回值,因为它就是调用函数
            // func.apply(this, args);// 这里的args为空没什么作用
            func(...args)
                // func.apply(this, args) 相当于  func()
        }, delay);
    };
}

// 将date时间对象进行格式转换 date接收Data对象 fmt接收传过来的格式
export function formatDate(date, fmt) {
    // 1.获取年份
    // y+ -> 正则的规则 表示可以匹配一个或多个y
    // y* -> 表示可以匹配0个或多个y
    // y? -> 表示可以匹配0个或1个y
    // if test  (表达式为真)  if test !表达式为假  
    if (/(y+)/.test(fmt)) {
        // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
        // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
        // getFullYear() 方法可返回一个表示年份的 4 位数字。
        // substr(start) 方法截取字符串 start必需。要抽取的子串的起始下标
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        // 如果 fmt接收的是yyyy-MM-dd RegExp.$1就==yyyy   RegExp.$1.length === 4
    }
    let o = {
        'M+': date.getMonth() + 1, //月 从0开始所以加1
        'd+': date.getDate(), //日
        'h+': date.getHours(), //时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds() //秒
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

// 作用如果时间的数字不是2位那就补齐
function padLeftZero(str) {
    // 如果str ==04  ('00' + str) =>0004 substr(str.length)=>substr(2) 从2开始截取 ==04
    // 如果str ==4   ('00' + str) =>004  substr(str.length)=>substr(1) 从1开始截取 ==04
    return ('00' + str).substr(str.length);
};