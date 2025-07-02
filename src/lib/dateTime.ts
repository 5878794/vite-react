const isPhp = false;


const get10Stamp = (stamp:any) => {
    return Math.ceil(stamp/1000);
}

//将参数转换为时间戳
// 		不存在返回当前时间戳
//支持   13位数字、字符串
// 		10位数字、字符串
// 		日期对象
// 		字符串2011-11-11 11:11:11     2011/11/11 11:11:11
const transformStamp = (stamp:any) => {
    if (!stamp) {
        return new Date().getTime();
    }

    if (typeof stamp == 'number') {
        if (stamp.toString().length == 10) {
            stamp = stamp * 1000;
        }
        stamp = new Date(stamp);
    }

    if (typeof stamp == 'string') {
        if (stamp.indexOf('-') > -1 || stamp.indexOf('\/') > -1) {
            stamp = Date.parse(stamp);
        } else {
            stamp = (stamp.length == 10)? parseInt(stamp)*1000 : parseInt(stamp);
            stamp = new Date(stamp);
        }
    }

    if(typeof stamp == 'object'){
        stamp = stamp.getTime();
    }

    return stamp;
}


/**
 * @description 日期格式转换
 * @param date :any  transformStamp可以转换的
 * @param fmt :string 输出的日期格式 yyyy-MM-dd hh:mm:ss
 * @return string
 * */
const formatDate = (date: any, fmt: string='YYYY-MM-DD') => {
    if (!date) {
        return ''
    }

    date = transformStamp(date);
    date = new Date(date);

    //y 年份
    const o:any = {
        "M+": date.getMonth() + 1,                 //月份
        "D+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };

    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substring(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) :
                (("00" + o[k]).substring(("" + o[k]).length)));
        }
    }

    return fmt;
}



export {formatDate}
