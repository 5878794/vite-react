

import base from "./base.tsx";
import {Input} from "antd";


class Text extends base{
    constructor(props:any) {
        super(props);
    }

    static defaultProps = {
        ...base.defaultProps,
        placeholder:base.defaultProps.placeholder || '请输入',
        iconRender:()=>null,
        unit:''
    }

    renderInput(){
        return <Input
            {...this.getInputProps()}
            className='w_100'
            variant={this.props.variant}
            defaultValue={this.state.showVal}
            prefix={this.props.iconRender()}
            size={this.props.inputSize}
            addonAfter={this.props.unit}
            status={this.state.errMsg == ''? '' : 'error'}
            onChange={(e:any)=>{
                this.updateVal(e.target.value)
            }}
        />
    }
}


export default Text
