import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";
import { Outlet } from "react-router-dom";

class Test extends ReactComponent{
  constructor(props:any) {
    super(props);
  }

  render(){
    return <>
      <div>test</div>
      <Outlet/>
    </>
  }
}




export default defineComponent(Test);
