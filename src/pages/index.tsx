//@ts-nocheck
import {ReactComponent,Provide,Inject} from "@/lib/defineComponent";
import css from '@/components/css.module.scss'

class Test1 extends ReactComponent{

    constructor(props:any) {
        super(props);
    }


    @Inject('aaa')
    @Inject('bbb')
    render(aaa:any,bbb:any){
        return <div>
            {aaa}-{bbb}
        </div>
    }
}


class Page extends ReactComponent{
    test:any;
    test1:any;
    constructor(props:any) {
        super(props);
        this.state = {
            provide:'abv'
        }
        this.test = this.ref(123);
        this.test1 = this.reactive({});
    }

    ready(){
        setInterval(()=>{
            this.test1.aaa = new Date().getTime() + 'aaa'
            this.test.value = new Date().getTime();
            this.setState({
                provide:new Date().getTime(),
                abc:'abc'+new Date().getTime()
            })
        },1000)
    }

    @Provide('aaa','provide')
    @Provide('bbb','abc')
    render(){
        return <div className={`${css.bg} box_hlt`}>
                <div className='box_slt' style={{width:'300px'}}>
                    <br/><br/><br/><br/><br/>
                    {this.test.value}
                    {this.test1.aaa}
                    <img src={`${import.meta.env.VITE_BASE_URL}/vite.svg`} />
                </div>
                <div className='boxflex1'>
                    <Test1/>
                </div>
            </div>
    }
}




export default Page;
