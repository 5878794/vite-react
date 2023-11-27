import {defineComponent,ReactComponent} from "../lib/defineComponent.tsx";
import { Outlet } from "react-router-dom";
import {createContext,useContext} from "react";
const tt = createContext(1);

class Test2 extends ReactComponent{
    static contextType = tt;
    constructor(props:any) {
        super(props);
    }

    render(){
        const val = this.context;
        return <>
            <div></div>
            <div>test2</div>
        </>
    }
}




export default defineComponent(Test2);
