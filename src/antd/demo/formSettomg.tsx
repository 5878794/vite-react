import device from '@/lib/device.ts'
import React from "react";


const setting = [
    {type:'group',style:{width:'50%'},children:[
        {type:'group',key:'a1',tabName:'tab1',children:[
            {
                label:'我的名字1',
                //输入框类型
                type:'text',
                //key
                key:'text1',
                //验证规则
                rule:'require,min:@a2.text2',
                //单位
                unit:'元',
                //样式
                style:{width:'50%'},
                //显示规则
                when:'g2.text4==1',
                //默认值
                value:'2',
                //固定报错
                errMsg:'xxxxx',
                //输入框内的图标
                iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                //输入框后面的文字介绍
                afterInputRender:()=> {
                    return <div style={{paddingLeft: '5px'}}>asdf</div>
                },
                changeFn:(val:any,obj:any,form:any)=>{
                    console.log(val,obj,form)
                },
                renderFn:(input:any,form:any)=>{
                    console.log(111)
                    console.log(input,form)
                },

            },
                {
                    //输入框类型  特有
                    type:'select',
                    multiple:true,
                    options:()=>{       //可以直接数组
                        return new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                resolve([
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe阿斯顿法师打发斯蒂芬阿斯顿发斯蒂芬阿斯顿法师打发是的法师打发', label: 'Yiminghe阿斯顿法师打发斯蒂芬阿斯顿发斯蒂芬阿斯顿法师打发是的法师打发' },
                                    { value: 'disabled', label: 'Disabled', disabled: true },
                                ])
                            },3000)
                        })
                    },
                    optionRender:(opt:any)=>{
                        return <div className='box_hlc'><img className='w20 h20' src={device.publicSrc+'vite.svg'}/>{opt.label+'aaaaaaa'}</div>
                    },
                },
        ]},
    ]},
    {label:'group',type:'group',key:'g2',style:{width:'100%'},children:[
        {label:'我的名字3',when:'g2.text4==1',type:'text',key:'text3',style:{width:'100%'}},
        {label:'text4',type:'text',value:'2',key:'text4',style:{width:'100%'},}
    ]}
]

//使用tab分标签组显示
//tab下需要group包裹  tabName为显示的文字
const tabSetting = [
    {type:'tab',style:{width:'50%'},children:[
        {type:'group',key:'a1',tabName:'tab1',children:[
            {
                label:'我的名字1',
                type:'text',
                key:'text1',
                rule:'require,min:@a2.text2',
                unit:'元',
                style:{width:'50%'},
                value:'2',
            },
        ]},
        {type:'group',key:'a2',tabName:'tab2',children:[
            {label: '我的名字2',disabled:false,
                rule:'require,price',
                type:'text',key:'text2',style:{width:'100%'},placeholder:'xxxx',
            },
            {label:'',type:'testCom',key:'text5'}
        ]}
    ]}
]
