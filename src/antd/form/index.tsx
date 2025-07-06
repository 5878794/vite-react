

import {ReactComponent} from "@/lib/defineComponent";
import Group from './group.tsx'
import device from "@/lib/device.ts";

import Text from "./input/text.tsx";

const InputComponent = {
    text:Text
}


//form组件
// setting参数
// setting:[
//     {
//     label:'group',
//     type:'group',
//     key:'g1',
//     style:{width:'100%'},
//     children:[
//        {
//              label:'我的名字1',
//              type:'text',
//              key:'text1',
//              rule:'require',
//              style:{width:'100%'},
//              afterInputRender:()=><div style={{paddingLeft:'5px'}}>asdf</div>    //输入框后面的自定义渲染
//         },
//         ...
//     ]},
//     ...
// ],



class Form extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            serverData:this.props.serverData,
            setting:this.handlerSetting(),
        }

        this.watchProp('setting',()=>{
            this.setState({
                setting:this.handlerSetting()
            })
        })
        this.watchProp('serverData',()=>{
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
        showRequire:true,    //是否显示必填的*
        labelChangeRow:false //label是否换行显示
    }


    //生成唯一的key
    handlerSetting(){
        const setting = this.props.setting;
        let temp_key = 0;
        const loopFn = (setting:any,key:string) => {
            setting.map((rs:any)=>{
                temp_key++;
                const nowKey = rs.key || '__temp_key__'+temp_key;
                rs._key = key? key+','+nowKey : nowKey;
                if(rs.children){
                    loopFn(rs.children,rs.key)
                }
            })
        }
        loopFn(setting,'');
        return setting;
    }

    //更新值
    updateValue(key:string,val:any){
        let serverData = device.cloneJson(this.state.serverData);
        const cache = serverData;
        const keys = key? key.split(',') : [];

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

        this.setState({
            serverData:cache
        })

        setTimeout(()=>{
            console.log(this.getData())
        },1000)
    }

    getData(){
        return this.state.serverData;
    }

    render(){
        return <Group
            setting={this.state.setting}
            serverData={this.state.serverData}
            labelStyle={this.props.labelStyle}
            showRequire={this.props.showRequire}
            customComponent={this.props.customComponent}
            inputComponent={InputComponent}
            labelChangeRow={this.props.labelChangeRow}
            updateValue={(key:string,val:any)=>{this.updateValue(key,val)}}
        />
    }
}


export default Form;
