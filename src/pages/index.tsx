
import {ReactComponent} from "@/lib/defineComponent.tsx";
import {Outlet} from "react-router-dom";

class Page extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    render(){
        return <div className='box_hlt'>
            <div className='box_slt' style={{width:'300px'}}>
                111
            </div>
            <div className='boxflex1'>
                <Outlet/>
            </div>
        </div>
    }
}


export default Page;
