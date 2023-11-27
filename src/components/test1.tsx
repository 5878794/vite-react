import {defineComponent,ReactComponent,Inject} from "../lib/defineComponent.tsx";
import { Outlet } from "react-router-dom";
import Test2 from "@/components/test2.tsx";

class Test extends ReactComponent{
    // static contextType:any = Inject('aaa');
    constructor(props:any) {
        super(props);
    }


    render(){
        console.log('test1')
        return <>
            <div>test1</div>
            <Test2/>
        </>
    }
}




export default defineComponent(Test);
