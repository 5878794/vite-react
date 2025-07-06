import {createContext} from 'react';
const MyProvideData:any = {};       //全局的  尽量不要用

const Provide = (nameSpace: string,provideKey:string) => {
    return (target: any, name: string, descriptor: any) => {
        const fn = descriptor.value;
        descriptor.value = function (...rest: any) {
            const data = fn.call(this, ...rest);
            if(!MyProvideData[nameSpace]){
                MyProvideData[nameSpace] = createContext(null);
            }
            const Context = MyProvideData[nameSpace];
            return <Context.Provider value={this.state[provideKey]}>
                {data}
            </Context.Provider>;
        }
    }
}
const Inject:any = (nameSpace:string) => {
    if(!MyProvideData[nameSpace]){
        MyProvideData[nameSpace] = createContext(null);
    }

    return (target: any, name: string, descriptor: any) => {
        const fn = descriptor.value;
        descriptor.value = function (...rest:any) {
            const Context = MyProvideData[nameSpace];
            return <Context.Consumer>
                {(prop:any)=>{
                    return fn.call(this, ...rest,prop);
                }}
            </Context.Consumer>
        }
    }
}


export {Provide,Inject}
