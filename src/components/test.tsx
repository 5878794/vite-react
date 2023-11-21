import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";

class Test extends ReactComponent{
  elementRef:any ;
  temp1Ref:any ;

  constructor(props:any) {
    super(props);

    this.state = {
      a:'123123'
    }
  }

  static defaultProps = {
    a:'123123'
  }

  ready(){
    console.log(this.elementRef)
    console.log(this.temp1Ref)
  }

  clickFn(){
    this.setState({a:new Date().getTime()});
  }


  render(){
    return <>
      <div ref={(e)=>this.domRef(e,'elementRef')} onClick={()=>this.clickFn()}>{this.props.a}={this.state.a}</div>
      <div ref={(e)=>this.domRef(e,'temp1Ref')}>222</div>
    </>
  }
}




export default defineComponent(Test);