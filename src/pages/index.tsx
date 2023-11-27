
import {ReactComponent} from "@/lib/defineComponent.tsx";
import {Outlet} from "react-router-dom";
import css from '@/components/css.module.scss'
import Test1 from "@/components/test1.tsx";
import {createContext,useState} from "react";
const MyContext = createContext(10);



class Page extends ReactComponent{
    static contextType = MyContext;
    test:any;
    test1:any = this.reactive({});
    constructor(props:any) {
        super(props);
        this.test = this.ref(123);
    }

    ready(){
        setInterval(()=>{
            this.test1.aaa = new Date().getTime() + 'aaa'
            this.test.value = new Date().getTime()
        },1000)
    }

    render(){
        return <div className={`${css.bg} box_hlt`}>
            <div className='box_slt' style={{width:'300px'}}>
                <br/><br/><br/><br/><br/>
                {this.test.value}
                {this.test1.aaa}
                <img src={`${import.meta.env.VITE_BASE_URL}/vite.svg`} />
            </div>
            <div className='boxflex1'>
                {/*<Test1/>*/}
            </div>
        </div>
    }
}


export default Page;
