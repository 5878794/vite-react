import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";
import Test1 from "@/components/test1.tsx";

class Test extends ReactComponent{
  constructor(props:any) {
    super(props);
  }

  render(){
    return <>
      <div>test</div>
      <Test1 aaa='a1'/>
      <Test1 aaa='a2'/>
    </>
  }
}




export default defineComponent(Test);
