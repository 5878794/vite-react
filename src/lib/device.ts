import _ from 'lodash';
import {formatDate} from "@/lib/dateTime.ts";
import openWin from "@/lib/openWin.tsx";
import {message,Modal} from "antd";


export default {
    publicSrc:import.meta.env.VITE_BASE_URL,
    isEmpty:(val:any)=>{return _.isEmpty(val)},
    isBool:(val:any)=>{return _.isBoolean(val)},
    isNaN:(val:any) => {return _.isNaN(val)},
    isArray:(val:any)=>{return _.isArray(val)},
    isObj:(val:any)=>{return _.isPlainObject(val)},
    cloneJson:(json:any)=>{return _.cloneDeep(json);},
    isFunction:(val:any)=>{return _.isFunction(val)},
    //日期格式化
    formatDate:formatDate,
    //打开一个弹窗
    //component:弹窗内的组件
    //props:组件的参数
    //opt:{
    //      title:string    弹窗标题
    //      footerBtns:[    弹窗底部按钮，默认自带  取消、确定    不需要按钮传入空数组
    //          {label:'取消',type:'',click:(closeFn:any)=>{closeFn();}},     //自带
    //          {label:'确定',type:'primary',click:'onSubmit'},               //自带  click为传入组件下的 async函数名
    //      ]
    //      footerRender:()=>React Dom      //底部按钮前的渲染函数
    //      keyboard:true,      //是否支持键盘 esc 关闭
    //      mask:true,          //是否展示遮罩
    //      maskClosable:false,  //点击蒙层是否允许关闭
    //      width:600,          //宽度
    //      needOpenLoading:false //打开弹窗的时候显示loading  如打开，传入的组件需要在props中接收 openWinHideLoading 参数 是一个函数用于关闭loading
    // }
    openWin:(component:any, props:any, opt:any)=>openWin(component, props, opt),    //返回promise
    info:(msg:string,type:'success'|'error'|'warning')=>{
        type = type??'success';
        message[type](msg)
    },
    alert:(msg:string,type:'info'|'success'|'error'|'warning'='info',title:string='系统提示')=>{
        return new Promise((resolve, reject)=>{
            Modal[type]({
                title: title,
                content: msg,
                onOk() {
                    resolve('')
                },
            });
        })
    },
    confirm:(msg:string,title:string='系统提示')=>{
        return new Promise((resolve,reject)=>{
            Modal.confirm({
                title: title,
                // icon: <ExclamationCircleFilled />,
                content: msg,
                onOk() {
                    resolve('')
                },
                onCancel() {
                    reject('')
                },
            });
        })

    },
    /**
     * @description 获取字符串真实长度  中文算2个字符
     * @param val string
     * */
    getStringLength:(val:any)=>{
        if(!val){return 0}
        let len = 0;
        for (let i = 0; i < val.length; i++) {
            const length = val.charCodeAt(i);
            if (length >= 0 && length <= 128) {
                len += 1;
            } else {
                len += 2;
            }
        }
        return len;}
}
