//@ts-nocheck
import {ReactComponent,Provide,Inject,withNavigation} from "@/lib/defineComponent";
import css from '@/components/css.module.scss'
import device from "@/lib/device.ts";
import { useNavigate,Link } from 'react-router-dom';
import React from "react";
import testCom from "@/antd/form/custom/testCom.tsx";

import Form from '@/antd/form/index.tsx'

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
    formRef:any = React.createRef(null)
    // test:any;
    // test1:any;
    constructor(props:any) {
        super(props);
        this.state = {
            setting:[],
            serverData:{
                a1:{
                    text1:'111'
                },
                g2:{
                    // text4:'4'
                }
                // g1:{
                //     text1:1,
                //     text2:2,
                // },
                // g2:{
                //     text3:3,
                //     text4:4,
                // },


            }
        }
    }

    ready(){
        // this.setState({
        //     test:123,
        //     test4:333,
        //     test1:{},
        //     test2:[1,2,3]
        // })
        //
        // setInterval(()=>{
        //     const temp = this.state.test2;
        //     temp[1] = new Date().getTime()+'abc'
        //     this.setState({
        //         test:new Date().getTime(),
        //         test2:temp
        //     })
        // },1000)




        // setInterval(()=>{
        //     this.test1.aaa = new Date().getTime() + 'aaa'
        //     this.test.value1 = new Date().getTime();
        //     this.setState({
        //         provide:new Date().getTime(),
        //         abc:'abc'+new Date().getTime()
        //     })
        //     console.log(123)
        // },1000)


        setTimeout(()=>{
            this.setState({
                setting:[
                    {type:'group',style:{width:'50%'},children:[
                        {type:'group',key:'a1',tabName:'tab1',children:[
                            {
                                label:'文本',
                                type:'text',
                                key:'text1',
                                rule:'require,min:@a2.text2',
                                unit:'元',
                                style:{width:'100%'},
                                value:'2',
                                // errMsg:'xxxxx',
                                // iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                                // afterInputRender:()=> {
                                //     return <div style={{paddingLeft: '5px'}}>asdf</div>
                                // },
                                changeFn:(val:any,obj:any,form:any)=>{
                                    console.log(val,obj,form)
                                }
                            },
                            {
                                label:'下拉',
                                type:'select',
                                key:'text6',
                                rule:'require',
                                style:{width:'100%'},
                                multiple:true,
                                value:'fff',
                                iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                                afterInputRender:()=>{return 'aaaa'},
                                options:()=>{
                                    return new Promise((resolve,reject)=>{
                                        setTimeout(()=>{
                                            resolve([
                                                { value: 'jack', label: 'Jack' },
                                                { value: 'lucy', label: 'Lucy' },
                                                { value: 'fff', label: 'Yiminghe阿斯顿法师打发斯蒂芬阿斯顿发斯蒂芬阿斯顿法师打发是的法师打发' },
                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                            ])
                                        },3000)
                                    })
                                },
                                // optionRender:(opt:any)=>{
                                //     return <div className='box_hlc'><img className='w20 h20' src={device.publicSrc+'vite.svg'}/>{opt.label+'aaaaaaa'}</div>
                                // },
                                // renderFn:(input:any,form:any)=>{
                                //     console.log(111)
                                //     console.log(input,form)
                                // },
                                // changeFn:(val:any,obj:any,form:any)=>{
                                //     console.log(val,obj,form)
                                // }
                            },
                            {
                                label:'级联',
                                type:'cascader',
                                key:'text7',
                                rule:'require',
                                style:{width:'100%'},
                                multiple:false,
                                value:'nanjing',
                                // iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                                options:()=>{
                                    return new Promise((resolve,reject)=>{
                                        setTimeout(()=>{
                                            resolve([
                                                {
                                                    value: 'zhejiang',
                                                    label: 'Zhejiang',
                                                    children: [
                                                        {
                                                            value: 'hangzhou',
                                                            label: 'Hanzhou',
                                                            children: [
                                                                {
                                                                    value: 'xihu',
                                                                    label: 'West Lake',
                                                                },
                                                                {
                                                                    value: 'xihu1',
                                                                    label: 'West Lake1',
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    value: 'jiangsu',
                                                    label: 'Jiangsu',
                                                    children: [
                                                        {
                                                            value: 'nanjing',
                                                            label: 'Nanjing',
                                                        },
                                                    ],
                                                },
                                            ])
                                        },3000)
                                    })
                                },
                                // optionRender:(opt:any)=>{
                                //     return <div className='box_hlc'><img className='w20 h20' src={device.publicSrc+'vite.svg'}/>{opt.label+'aaaaaaa'}</div>
                                // },
                                // renderFn:(input:any,form:any)=>{
                                //     console.log(111)
                                //     console.log(input,form)
                                // },
                                // changeFn:(val:any,obj:any,form:any)=>{
                                //     console.log(val,obj,form)
                                // }
                            }
                        ]},
                        {type:'group',key:'a2',tabName:'tab2',children:[
                            {label: '我的名字2',disabled:false,
                                rule:'require,price',
                                type:'text',key:'text2',style:{width:'100%'},placeholder:'xxxx',
                                // iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                            },
                            {label:'',type:'testCom',key:'text5'}
                        ]}


                    ]},
                    {label:'group',type:'group',key:'g2',style:{width:'100%'},children:[
                        {label:'我的名字3',when:'g2.text4==2',type:'text',key:'text3',style:{width:'100%'}},
                        {label:'text4',type:'text',value:'2',key:'text4',style:{width:'100%'},}
                    ]}
                ]
            })
        },2000)
    }

    // pageChange(){
    //     // this.test1111();
    //     // console.log(this.props)
    //     this.pageTo('/abc/tt/1')
    //     // const navigate = useNavigate();
    //     // navigate('/abc/1');
    // }


    // async openWin(){
    //     await device.confirm('打开弹窗？');
    //     const data = await device.openWin(Test2,{aaa:222222,bbb:33333},{
    //         title:'托尔斯泰',
    //         width:1000,
    //         needOpenLoading:true
    //     });
    //     console.log(data)
    // }

    async getData(){
        // const a = this.formRef.current.find('g2.text4')
        // console.log(a)

        const data = this.formRef.current.getData();
        console.log(data)

        const data1 = await this.formRef.current.checkAndGetData();
        console.log(data1)


    }

    // @Provide('aaa','test')
    // @Provide('bbb','test4')
    render(){
        // return <div>
        //     <div onClick={()=>{this.pageChange()}}>{this.state.test}</div>
        //     <div>{this.state.test4}</div>
        //     {this.state.test2.map((rs:any)=>{
        //         return <div key={rs}>{rs}</div>
        //     })}
        //     <div>--------------</div>
        //     <div onClick={()=>this.openWin()}>open win</div>
        //     <Test1/>
        // </div>

        return <>
            <div>1111</div>
            <Form ref={this.formRef} setting={this.state.setting} serverData={this.state.serverData} customComponent={{testCom}}/>
            <div onClick={()=>{this.getData()}}>getDate</div>
        </>
    }
}


export default withNavigation(Page);
