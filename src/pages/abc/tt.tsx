

import {ReactComponent,withNavigation} from "@/lib/defineComponent";
import { Outlet } from "react-router-dom";

class abc extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    pageChange(path:number){
        this.props.navigate('/abc/tt/'+path)
    }

    render(){
        return <div className='w100 h100 box_hlt'>
            <div className='w300 h100 bgRed'>
                <div onClick={() => this.pageChange(1)}>111</div>
                <div onClick={() => this.pageChange(2)}>222</div>
            </div>
            <div style={{width:'300px',height:'100vh'}}>
                <Outlet />
            </div>
        </div>
    }
}


export default withNavigation(abc)
