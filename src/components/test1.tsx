import {defineComponent,ReactComponent,Provide} from "@/lib/defineComponent";
import { Outlet } from "react-router-dom";
import Test2 from "@/components/test2.tsx";

class Test extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            aaa:props.aaa
        }
        setInterval(()=>{
            this.setState({
                aaa:props.aaa+'_'+new Date().getTime()
            })
        },1000)
    }

    static defaultProps = {
        aaa:123
    }

    @Provide('aaa','aaa')
    render(){
        return <>
            <div>test1</div>
            <Test2/>
        </>
    }
}




export default defineComponent(Test);
