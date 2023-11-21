
//输出vue，react通用的接口

import React from "react";


class ReactComponent extends React.Component<any, any>{

  constructor(props:any) {
    super(props);
    this.state = {};


  }

  ready(){}
  destroy(){}
  update(preProp:any,preState:any){}
  watchProp(){return {}}
  watchState(){return {}}

  componentDidMount(){
    this.ready();
  }

  componentWillUnmount(){
    this.destroy();
  }


  // shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
  //   console.log(nextProps,nextState,nextContext)
  //   return true;
  // }


  componentDidUpdate(prop:any,state:any){
    this.update(prop,state);

    //检查prop是否有变化
    const watchProp:any = this.watchProp();
    for(let [key,val] of Object.entries(watchProp)){
      if(prop[key] !== this.props[key] && typeof val === 'function'){
        (val as any)(this.props[key],prop[key])
      }
    }

    //检查state是否有变化
    const watchState:any = this.watchState();
    for(let [key,val] of Object.entries(watchState)){
      if(state[key] !== this.state[key] && typeof val === 'function'){
        (val as any)(this.state[key],state[key])
      }
    }

    return null;
  }



}

const defineComponent = (com:any) => {
  return com;
}


export  {
  ReactComponent,
  defineComponent
};
