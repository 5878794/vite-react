import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";
import { Outlet } from "react-router-dom";
import Test2 from "@/components/test2.tsx";

class Test extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    render(){
        return <>
            <div>test1</div>
            <Test2/>
        </>
    }
}




export default defineComponent(Test);
