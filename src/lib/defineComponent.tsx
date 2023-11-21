
//输出vue，react通用的接口

import React from "react";


class ReactComponent extends React.Component<any, any>{

  constructor(props:any) {
    super(props);
    this.state = {};
    this.domRef = this.domRef.bind(this);
  }

  ready(){}
  destroy(){}
  update(){}

  componentDidMount(){
    this.ready();
  }

  componentWillUnmount(){
    this.destroy();
  }

  componentDidUpdate(){
    this.update();
  }

  domRef(e:any,key:string){
    (this as any)[key] = e;
  }

}

const defineComponent = (com:any) => {
  return com;
}


export  {
  ReactComponent,
  defineComponent
};
