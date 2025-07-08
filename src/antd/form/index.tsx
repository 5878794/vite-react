

import {ReactComponent} from "@/lib/defineComponent";
import Group from './group.tsx'
import device from "@/lib/device.ts";
import React from "react";

import Text from "./input/text.tsx";

const InputComponent = {
    text:Text
}

//TODO    其它组件

//form组件
// setting参数
// setting:[
//     {
//     type:'group',    //包裹层只能是group和tab, tab的下层必须是group，且group增加tabName属性指定tab的名称
//     key:'g1',        //非必须，填写后下级key会带层级
//     labelRender:()=>{return <div></div>}, //非必填
//     style:{},
//     children:[
//        {
//              label:'我的名字1',
//              type:'text',
//              key:'text1',
//              placeholder:'',
//              rule:'require,max:@key',
//              when:'aa.bb==1',            //所有元素都支持when属性
//              style:{width:'100%'},
//              dataType:'',        //默认数据类型(一般自定义组件用)，默认:''   array时默认值为[]   obj时默认为{}
//              unit:'元',
//              value:'',       //默认值  会同初始serverData合并
//              errMsg:'',      //验证出错时固定显示
//              afterInputRender:()=><div style={{paddingLeft:'5px'}}>asdf</div>    //输入框后面的自定义渲染
//              iconRender:()=><img src={} />   //输入框内前面的图标自定义渲染
//         },
//         ...
//     ]},
//     ...
// ],




class Form extends ReactComponent{
    formRef:any = {}
    linkCheck:any = {};     //关联验证的key关系
    cacheDataForWhen:any = {};  //为when缓存的serverData
    constructor(props:any) {
        super(props);

        this.state = {
            serverData:this.props.serverData,
            setting:this.handlerSetting(),
        }

        this.watchProp('setting',()=>{
            this.formRef = {}
            this.setState({
                setting:this.handlerSetting()
            })
        })
        this.watchProp('serverData',()=>{
            this.setDefaultDataForWhen()
            this.setState({
                serverData:this.props.serverData
            })
        })
    }

    static defaultProps = {
        setting:[],
        serverData:{},
        customComponent:{}, //自定义组件
        labelStyle:{width:'100px',textAlign:'right'},
        variant:'outlined',     //输入框样式   outlined:带边框  filled:背景和边框灰色  borderless：无边框   underlined：只有下边框
        showRequire:true,    //是否显示必填的*
        labelChangeRow:false, //label是否换行显示
    }

    addFormRef(key:string,ref:any){
        this.formRef[key] = ref;
    }

    //给when的cache设置默认值
    setDefaultDataForWhen(){
        const loopFn = (data:any,inKey:string) => {
            for(let [key,val] of Object.entries(data)){
                const nowKey = inKey? inKey+'.'+key : key;
                if(this.cacheDataForWhen[nowKey]){
                    this.cacheDataForWhen[nowKey] = val;
                }

                if(device.isObj(val)){
                    loopFn(val,nowKey)
                }
            }
        }
        loopFn(this.props.serverData,'')
    }

    handlerSetting(){
        //计算默认值 (先赋值空)
        const cacheDataForWhen:any = {};
        //生成唯一的key
        const setting = this.props.setting;
        let temp_key = 0;
        const loopFn = (setting:any,key:string) => {
            setting.map((rs:any)=>{
                temp_key++;
                const nowKey = rs.key || '__temp_key__'+temp_key;
                rs._key = key? key+'.'+nowKey : nowKey;

                if(rs.type != 'group' && rs.type != 'tab'){
                    cacheDataForWhen[rs._key] = (rs.value || rs.value ==0) ? rs.value : rs.dataType == 'array'? [] : rs.dataType == 'obj'? {} : '';
                }

                if(rs.children){
                    loopFn(rs.children,rs.key)
                }
            })
        }
        loopFn(setting,'');
        this.cacheDataForWhen = cacheDataForWhen;
        this.setDefaultDataForWhen()

        //获取需要验证的关联的key
        const linkCheck:any = {};
        const loopFn1 = (setting:any) => {
            setting.map((rs:any)=>{
                if(rs.rule && rs.rule.indexOf('@')>-1){
                    const rules = rs.rule.split(',');
                    rules.map((rs1:any)=>{
                        if(rs1.indexOf('@')>-1){
                            let key = rs1.split(':')[1];
                            key = key.substring(1);
                            if(!linkCheck[rs._key]){
                                linkCheck[rs._key] = [];
                            }
                            if(!linkCheck[key]){
                                linkCheck[key] = [];
                            }

                            linkCheck[rs._key].push(key)
                            linkCheck[key].push(rs._key)
                        }
                    })
                }
                if(rs.children){
                    loopFn1(rs.children)
                }
            })
        }
        loopFn1(setting)
        this.linkCheck = linkCheck;

        return setting;
    }

    //更新值
    updateValue(key:string,val:any){
        let serverData = device.cloneJson(this.state.serverData);
        const cache = serverData;
        const keys = key? key.split('.') : [];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                // 最后一项，赋值
                serverData[key] = val;
            } else {
                // 如果中间的对象不存在，就创建
                if (!serverData[key]) {
                    serverData[key] = {};
                }
                serverData = serverData[key];
            }
        }

        this.cacheDataForWhen[key] = val;
        this.setState({
            serverData:cache
        })
    }

    // form.current.find('g1.text1')
    find(key:string){
        return this.formRef[key];
    }

    checkAndGetData(){

        return new Promise((resolve,reject)=>{
            let pass = true;
            for(let [key,ref] of Object.entries(this.formRef)){
                if(ref && (ref as any).checkInput){
                    const thisPass = (ref as any).checkInput(false);
                    if(!thisPass){
                        pass = false
                    }
                }
            }

            if(pass){
                resolve(this.getData())
            }else{
                reject('');
            }
        })
    }

    //有可能未验证过的数据
    getData(){
        const obj:any= {};

        const setObj = (key:string,val:any) => {
            const keys = key? key.split('.') : [];
            let tempObj = obj;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (i === keys.length - 1) {
                    // 最后一项，赋值
                    tempObj[key] = val;
                } else {
                    // 如果中间的对象不存在，就创建
                    if (!tempObj[key]) {
                        tempObj[key] = {};
                    }
                    tempObj = tempObj[key];
                }
            }
        }

        for(let [key,ref] of Object.entries(this.formRef)){
            if((ref as any)){
                const val = (ref as any).showVal2Val((ref as any).state.showVal);
                setObj(key,val)
            }
        }

        return obj;
    }


    render(){
        return <Group
            addFormRef={(key:string,ref:any)=>{this.addFormRef(key,ref)}}
            getFormRef={()=>{return this}}
            setting={this.state.setting}
            serverData={this.state.serverData}
            labelStyle={this.props.labelStyle}
            variant={this.props.variant}
            showRequire={this.props.showRequire}
            customComponent={this.props.customComponent}
            inputComponent={InputComponent}
            labelChangeRow={this.props.labelChangeRow}
            updateValue={(key:string,val:any)=>{this.updateValue(key,val)}}
        />
    }
}


export default Form;
