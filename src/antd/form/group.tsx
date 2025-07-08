

import {ReactComponent} from "@/lib/defineComponent";
import React from "react";
import {Segmented} from 'antd';
import device from "@/lib/device.ts";



class Group extends ReactComponent{
    constructor(props:any) {
        super(props);
    }


    static defaultProps = {
        setting:[],
        serverData:{},
        customComponent:{},
        labelStyle:{},
        variant:'',
        showRequire:true,
        inputComponent:{},
        updateValue:()=>{},
        labelChangeRow:false,
        addFormRef:()=>{},
        getFormRef:()=>{}
    }

    //检查是否显示  when:'aa.aa==1'
    checkShowOrHide(setting:any){
        const when = setting.when;
        let pass = true;

        if(when){
            const serverData = this.props.getFormRef().cacheDataForWhen;


            const variableRegex = /\b[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\b/g;
            const reserved = new Set(["true", "false", "null", "undefined"]);
            const numbers = /^\d+(\.\d+)?$/;

            // 找出所有变量 并替换
            const str = when.replace(variableRegex, (match:any) => {
                if (reserved.has(match) || numbers.test(match)) {
                    return match; // 跳过关键字或数字
                }
                return serverData[match] || undefined;
            });

            //计算表达式是否成立
            const result = new Function(`return ${str}`)();

            if(!result){
                pass = false;
            }
        }

        return pass;
    }


    renderItem(setting:any){
        const show = this.checkShowOrHide(setting);
        if(!show){

            return null;
        }

        if(setting.type == 'group'){
            const serverData = setting.key? this.props.serverData[setting.key] : this.props.serverData;
            return <div key={setting._key} className='group'>
                {setting.labelRender && setting.labelRender()}
                <Group
                    addFormRef={this.props.addFormRef}
                    getFormRef={this.props.getFormRef}
                    setting={setting.children}
                    serverData={serverData}
                    labelStyle={this.props.labelStyle}
                    variant={this.props.variant}
                    showRequire={this.props.showRequire}
                    customComponent={this.props.customComponent}
                    inputComponent={this.props.inputComponent}
                    updateValue={this.props.updateValue}
                    labelChangeRow={this.props.labelChangeRow}
                />
            </div>
        }else if(setting.type == 'tab'){
            const tabNames = setting.children.reduce((arr:any,item:any)=>{
                arr.push(item.tabName);
                return arr;
            },[]);
            const serverData = setting.key? this.props.serverData[setting.key] : this.props.serverData;
            const guid = device.guid();

            return <div id={guid} className='w_100' key={setting._key+'__'}>
                <div className='w_100 box_hcc'>
                    <Segmented
                        className='mb20'
                        style={{textAlign:'center'}}
                        key={setting._key}
                        size='large'
                        options={tabNames}
                        onChange={(value) => {
                            const n= tabNames.indexOf(value);
                            const body = document.getElementById(guid);
                            const child = body!.getElementsByClassName('__tab_group__');
                            for(let i=0,l=child.length;i<l;i++){
                                (child[i] as any).style.display = 'none';
                            }
                            (child[n] as any).style.display = 'flex';
                        }}
                    />
                </div>
                {setting.children.map((group:any,i:number)=>{
                    const style = i==0? {display:'flex'} : {display: 'none'}
                    return <div key={i} className={'__tab_group_'+i+' __tab_group__'} style={style}>
                        <Group
                            key={group._key}
                            addFormRef={this.props.addFormRef}
                            getFormRef={this.props.getFormRef}
                            setting={group.children}
                            serverData={serverData}
                            labelStyle={this.props.labelStyle}
                            variant={this.props.variant}
                            showRequire={this.props.showRequire}
                            customComponent={this.props.customComponent}
                            inputComponent={this.props.inputComponent}
                            updateValue={this.props.updateValue}
                            labelChangeRow={this.props.labelChangeRow}
                        />
                    </div>
                })}
            </div>
        }else{
            //普通元素
            const type = setting.type;
            const Tag = this.props.inputComponent[type] || this.props.customComponent[type];
            if(!Tag){
                console.error(`Form 组件中 ${type} 不存在`);
                return null;
            }

            this.props.addFormRef(setting._key,)

            // const defaultVal = setting.dataType == 'array'? [] : setting.dataType == 'obj'? {} : '';
            return <Tag
                ref={(el:any)=>{this.props.addFormRef(setting._key,el)}}
                getFormRef={this.props.getFormRef}
                {...setting}
                // addFormRef={this.props.addFormRef}
                updateValue={this.props.updateValue}
                showRequire={this.props.showRequire}
                variant={this.props.variant}        //输入框样式
                labelStyle={Object.assign({},this.props.labelStyle,setting.labelStyle??{})}
                labelChangeRow={this.props.labelChangeRow}
                defaultValue={this.props.serverData[setting.key]}
            />
        }
    }

    render(){
        return <div className='box_hlt w_100 box_lines'>
            {this.props.setting.map((setting:any)=>{
                return this.renderItem(setting)
            })}
        </div>
    }
}



export default Group
