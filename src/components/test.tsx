import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";

class Test extends ReactComponent{
  elementRef:any ;
  temp1Ref:any ;

  constructor(props:any) {
    super(props);

    this.state = {
      a:'123123',
      d:''
    }
  }

  static defaultProps = {
    a:'123123'
  }


  //会触发多次运行render函数
  watchProp(){
    return {
      a:(newVal:any,oldVal:any)=>{
        this.setState({a:newVal})
      }
    }
  }

  watchState(){
    return {
      a:(newVal:any,oldVal:any) => {
        this.setState({d:newVal})
      }
    }
  }


  test(){
    console.log(123)
  }

  ready(){
    console.log(this.elementRef)
    console.log(this.temp1Ref)
  }

  destroy(){
    console.log('d')
  }

  clickFn(){
    this.setState({a:new Date().getTime()});
  }


  render(){
    console.log('r:'+new Date().getTime())
    return <>
      <div
        ref={e=>this.elementRef =e}
        onClick={()=>this.clickFn()}
      >{this.state.a}</div>
      <div ref={e=>this.temp1Ref=e}>{this.state.d}</div>
    </>
  }
}




export default defineComponent(Test);
