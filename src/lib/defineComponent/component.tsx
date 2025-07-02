
//输出vue，react通用的接口

import React, {createContext} from "react";

class ReactComponent extends React.Component<any, any> {
    watchCatchProp:any = {};
    watchCatchState:any = {};
    props:any;

    constructor(props: any) {
        super(props);
        this.props = props;
        this.state = {};
    }

    ready(data?:any) {
    }

    destroy() {
    }

    update(preProp: any, preState: any) {
    }

    //页面跳转 需要继承的类输出 withNavigation(react class)
    pageTo(path:string){
        this.props.navigate(path)
    }


    componentDidMount() {
        this.ready();
    }

    componentWillUnmount() {
        this.destroy();
    }

    //注册prop的监听函数
    //使用   this.watchProp('prop_key',(oldVal:any,newVal:any)=>{....} )
    watchProp(key:string,fn:any){
        this.watchCatchProp[key] = fn;
    }

    //注册state的监听函数
    //使用   this.watchState('state_key',(oldVal:any,newVal:any)=>{....} )
    watchState(key:string,fn:any){
        this.watchCatchState[key] = fn;
    }

    componentDidUpdate(perProps:any,perState:any){
        for(let [key,val] of Object.entries(perProps)){
            if(perProps[key] !== this.props[key] && this.watchCatchProp[key]){
                //判断之前的值和现在的值是否相等  且注册咯监听的
                //监听函数返回老的值和新的值
                this.watchCatchProp[key](perProps[key],this.props[key]);
            }
        }

        for(let [key,val] of Object.entries(perState)){
            if(perState[key] !== this.state[key] && this.watchCatchState[key]){
                //判断之前的值和现在的值是否相等  且注册咯监听的
                //监听函数返回老的值和新的值
                this.watchCatchState[key](perState[key],this.state[key]);
            }
        }
    }

    render(...rest:any):any{
        return <></>
    }

}

const defineComponent = (com: any) => {
    return com;
}


export {
    ReactComponent,
    defineComponent,
};

