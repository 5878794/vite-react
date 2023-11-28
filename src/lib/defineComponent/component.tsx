
//输出vue，react通用的接口

import React, {createContext} from "react";

class ReactComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    ready(data?:any) {
    }

    destroy() {
    }

    update(preProp: any, preState: any) {
    }

    watchProp() {
        return {}
    }

    watchState() {
        return {}
    }

    componentDidMount() {
        this.ready();
    }

    componentWillUnmount() {
        this.destroy();
    }

    componentDidUpdate(prop: any, state: any) {
        this.update(prop, state);

        //检查prop是否有变化
        const watchProp: any = this.watchProp();
        for (let [key, val] of Object.entries(watchProp)) {
            if (prop[key] !== this.props[key] && typeof val === 'function') {
                (val as any)(this.props[key], prop[key])
            }
        }

        //检查state是否有变化
        const watchState: any = this.watchState();
        for (let [key, val] of Object.entries(watchState)) {
            if (state[key] !== this.state[key] && typeof val === 'function') {
                (val as any)(this.state[key], state[key])
            }
        }

        return null;
    }

    //需要类初始化的时候设置
    ref(val: any) {
        const symbolKey = Symbol();
        const _this = this;

        (this.state as any)[symbolKey] = val;

        return new Proxy({}, {
            get(target: any, key: any, receiver: any) {
                return (_this.state as any)[symbolKey];
            },
            set(target: any, key: any, val: any, receiver: any) {
                const obj: any = {};
                obj[symbolKey] = val;
                _this.setState(obj)
                return true;
            }
        })
    }

    //需要类初始化的时候设置  不能设置数组
    reactive(val: any) {
        const symbolKey = Symbol();
        const _this = this;

        (this.state as any)[symbolKey] = val;

        return new Proxy({}, {
            get(target: any, key: any, receiver: any) {
                return (_this.state as any)[symbolKey][key];
            },
            set(target: any, key: any, val: any, receiver: any) {
                const obj: any = {};
                obj[symbolKey] = (_this.state as any)[symbolKey];
                obj[symbolKey][key] = val;

                _this.setState(obj)
                return true;
            }
        })

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

