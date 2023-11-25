
import {ReactComponent} from "@/lib/defineComponent.tsx";
import {Outlet} from "react-router-dom";
import css from '@/components/css.module.scss'

class Page extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    render(){
        return <div className={`${css.bg} box_hlt`}>
            <div className='box_slt' style={{width:'300px'}}>
                <br/><br/><br/><br/><br/>
                <img src={`${import.meta.env.VITE_BASE_URL}/vite.svg`} />
            </div>
            <div className='boxflex1'>
                <Outlet/>
            </div>
        </div>
    }
}


export default Page;
