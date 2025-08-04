import device from '@/lib/device.ts'
import React from "react";


const setting = [
    {type:'group',style:{width:'50%'},children:[
        {type:'group',key:'a1',tabName:'tab1',children:[
            {
                //所有类型都有的。。。。。。。。。。。。。。。。。。。。
                label:'我的名字1',
                //key
                key:'text1',
                //验证规则
                rule:'require,min:@a2.text2',
                //样式
                style:{width:'50%'},
                //显示规则
                when:'g2.text4==1',
                //默认值
                value:'2',
                //固定报错
                errMsg:'xxxxx',
                changeFn:(val:any,obj:any,form:any)=>{
                    console.log(val,obj,form)
                },
                renderFn:(input:any,form:any)=>{
                    console.log(111)
                    console.log(input,form)
                },
                //输入框内的图标
                iconRender:()=><img className='w20 h20' src={device.publicSrc+'vite.svg'} />,
                //输入框后面的文字介绍
                afterInputRender:()=> {
                    return <div style={{paddingLeft: '5px'}}>asdf</div>
                },


                //text特有。。。。。。。。。。。。。。。。。。。。。。。。
                //输入框类型
                type:'text',
                //单位
                unit:'元',

            },
            {
                //select、cascader 特有。。。。。。。。。。。。。。。。。。。。。。。。
                //输入框类型
                type:'select',  //或 cascader
                multiple:true,
                value:'',       //cascader最后一层的value，多选逗号隔开字符串
                options:()=>{       //可以直接数组  //cascader 数据多一层children
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
            {
                //date 特有。。。。。。。。。。。。。。。。。。。。。。。。
                type:'date',
                showTime:true,
                format:'YYYY-MM-DD HH:mm',  //显示的格式
                value:'1754273245549',
                picker:undefined,      //周：week 月：month  季度：quarter 年：year
                min:'1754253033000',        //控制日期的最小、最大的显示值
                max:'',
                hideHours:[20,21,22,23],        //时间、分、秒 不显示的值
                hideMinutes:[],     //0-59
                hideSeconds:[]      //0-59
            },
            {
                //date 特有。。。。。。。。。。。。。。。。。。。。。。。。
                type:'dateRange',
                showTime:true,
                format:'YYYY-MM-DD HH:mm',  //显示的格式
                value:'1754273245549',
                picker:undefined,      //周：week 月：month  季度：quarter 年：year
                min:'1754253033000',        //控制日期的最小、最大的显示值
                max:'',
                hideHours:[20,21,22,23],        //时间、分、秒 不显示的值
                hideMinutes:[],     //0-59
                hideSeconds:[],      //0-59
                disableds:[false,false],    //是否禁用
                allowEmpty:[true,true],     //是否能为空
            }
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
