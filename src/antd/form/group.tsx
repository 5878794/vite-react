

import {ReactComponent} from "@/lib/defineComponent";
import React from "react";
import {set} from "lodash";



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

    renderItem(setting:any){
        if(setting.type == 'group'){
            const serverData = setting.key? this.props.serverData[setting.key] : this.props.serverData;
            return <div key={setting._key} className='group'>
                {setting.render && setting.render()}
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
            //TODO

        }else{
            //普通元素
            const type = setting.type;
            const Tag = this.props.inputComponent[type] || this.props.customComponent[type];
            if(!Tag){
                console.error(`Form 组件中 ${type} 不存在`);
                return null;
            }

            this.props.addFormRef(setting._key,)

            const defaultVal = setting.dataType == 'array'? [] : setting.dataType == 'obj'? {} : '';
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
                defaultValue={this.props.serverData[setting.key]??defaultVal}
            />
        }
    }

    render(){
        return <>
            {this.props.setting.map((setting:any)=>{
                return this.renderItem(setting)
            })}
        </>
    }
}



export default Group
