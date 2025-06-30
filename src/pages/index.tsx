//@ts-nocheck
import {ReactComponent,Provide,Inject,withNavigation} from "@/lib/defineComponent";
import css from '@/components/css.module.scss'
import device from "@/lib/device.ts";
import { useNavigate,Link } from 'react-router-dom';

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



    // test:any;
    // test1:any;
    constructor(props:any) {
        super(props);
        this.state = {
            test2:[]
        }
    }

    ready(){
        this.setState({
            test:123,
            test4:333,
            test1:{},
            test2:[1,2,3]
        })

        setInterval(()=>{
            const temp = this.state.test2;
            temp[1] = new Date().getTime()+'abc'
            this.setState({
                test:new Date().getTime(),
                test2:temp
            })
        },1000)




        // setInterval(()=>{
        //     this.test1.aaa = new Date().getTime() + 'aaa'
        //     this.test.value1 = new Date().getTime();
        //     this.setState({
        //         provide:new Date().getTime(),
        //         abc:'abc'+new Date().getTime()
        //     })
        //     console.log(123)
        // },1000)
    }

    pageChange(){
        // this.test1111();
        // console.log(this.props)
        this.props.navigate('/abc/1')
        // const navigate = useNavigate();
        // navigate('/abc/1');
    }

    // @Provide('aaa','provide')
    // @Provide('bbb','abc')
    // render(){
    //     return <div className={`${css.bg} box_hlt`}>
    //             <div className='box_slt' style={{width:'300px'}}>
    //                 {this.state.abc}
    //                 <br/><br/><br/><br/><br/>
    //                 <Link to='/abc/1'>{this.test.value1}-1123</Link>
    //                 <br/>
    //                 {this.test1.aaa}
    //                 <img src={`${device.publicSrc}/vite.svg`} />
    //             </div>
    //             <div className='boxflex1'>
    //                 <Test1/>
    //             </div>
    //         </div>
    // }

    @Provide('aaa','test')
    @Provide('bbb','test4')
    render(){
        return <div>
            <div onClick={()=>{this.pageChange()}}>{this.state.test}</div>
            <div>{this.state.test4}</div>
            {this.state.test2.map((rs:any)=>{
                return <div key={rs}>{rs}</div>
            })}
            <div>--------------</div>
            <Test1/>
        </div>
    }
}


export default withNavigation(Page);
