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

class Test2 extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            height:'200'
        }
    }

    static defaultProps=  {
        aaa:1,
        bbb:2,
        openWinHideLoading:()=>{}
    }

    async onSubmit(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('aaa')
            },2000)
        })
    }

    ready(){
        setTimeout(()=>{
            this.setState({
                height:400
            })
        },1000)
        setTimeout(()=>{
            this.props.openWinHideLoading();
        },3000)


    }

    render(){
        return <div style={{height:this.state.height+'px'}}>
            {this.props.aaa}-{this.props.bbb}
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
        this.pageTo('/abc/tt/1')
        // const navigate = useNavigate();
        // navigate('/abc/1');
    }


    async openWin(){
        await device.confirm('打开弹窗？');
        const data = await device.openWin(Test2,{aaa:222222,bbb:33333},{
            title:'托尔斯泰',
            width:1000,
            needOpenLoading:true
        });
        console.log(data)
    }

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
            <div onClick={()=>this.openWin()}>open win</div>
            <Test1/>
        </div>
    }
}


export default withNavigation(Page);
