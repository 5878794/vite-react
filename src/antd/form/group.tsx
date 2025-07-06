

import {ReactComponent} from "@/lib/defineComponent";




class Group extends ReactComponent{
    constructor(props:any) {
        super(props);
    }


    static defaultProps = {
        setting:[],
        serverData:{},
        customComponent:{},
        labelStyle:{},
        showRequire:true,
        inputComponent:{},
        updateValue:()=>{},
        labelChangeRow:false
    }

    renderItem(setting:any){
        if(setting.type == 'group'){
            const serverData = setting.key? this.props.serverData[setting.key] : this.props.serverData;
            return <div key={setting._key} className='group'>
                <Group
                    setting={setting.children}
                    serverData={serverData}
                    labelStyle={this.props.labelStyle}
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


            return <Tag
                {...setting}
                updateValue={this.props.updateValue}
                showRequire={this.props.showRequire}
                labelStyle={Object.assign({},this.props.labelStyle,setting.labelStyle??{})}
                labelChangeRow={this.props.labelChangeRow}
                defaultVal={this.props.serverData[setting.key]}
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
