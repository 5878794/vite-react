//只支持一层传递


import {defineComponent,ReactComponent} from "@/lib/defineComponent";
import {cloneElement} from "react";

class Slot extends ReactComponent{
    slotName:String = 'v-slot';  //父元素设置slot的name的key

    constructor(props:any) {
        super(props);
    }

    findParentCustomReactDom(){
        const stateNode = (this as any)._reactInternals;
        if(!stateNode){return []}

        let find:any = [];
        const loopFn = (obj:any) => {
            const type = typeof obj.type;
            if(type == 'string'){
                loopFn(obj.return)
            }else{
                find = obj.memoizedProps?.children?? [];
            }
        }
        loopFn(stateNode.return);

        return find;
    }

    render(){
        let {children,name,...newProps} = this.props;

        children = children || this.findParentCustomReactDom();
        name = name || 'default';

        const item = children.find((rs:any)=>{
            const key = this.slotName;
            const slotName = rs.props[key.toLowerCase()] || 'default';
            return slotName== name
        })

        if(!item){return null;}

        const nowProp:any = {};
        for(let [key,val] of Object.entries(newProps)){
            nowProp[key] = val;
        }

        const newItem = cloneElement(item,nowProp);

        return newItem || null;
    }
}

export  {Slot}
