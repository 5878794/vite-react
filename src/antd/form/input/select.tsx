

import base from "./base.tsx";
import {Select} from "antd";
import device from "@/lib/device.ts";


class MySelect extends base{
    constructor(props:any) {
        super(props);

        this.state = {
            ...this.state,
            loading: false,
            options:[],
            emptyText:'暂无数据'
        };

        this.watchProp('options',()=>{
            this.createOption(this.props.options)
        })
    }

    static defaultProps = {
        ...base.defaultProps,
        placeholder:base.defaultProps.placeholder || '请选择',
        multiple:false,     //是否多选
        maxTagCount:1,      //多选时 最多显示几个tag,（样式设置里面只有第1个有最大宽度，设置大于1的值时 多选可能会换行）
        options:[],         //数组 或 异步函数返回数组
        optionRender:null,  //option自定义渲染  (option:any)=>{<div>{option.data.label}</div>}
    }

    ready(){
        this.createOption(this.props.options)
    }

    createOption(options:any){
        if(!(device.isArray(options) || device.isFunction(options))){
            console.error('select的options不是数组或函数');
            return;
        }

        if(device.isFunction(options)){
            this.setState({
                loading:true,
                emptyText:'加载中...'
            })
            options().then((rs:any)=>{
                this.setState({
                    loading:false,
                    emptyText:'暂无数据',
                    options:rs
                })
            }).catch((e:any)=>{
                this.setState({
                    loading:false,
                    emptyText:'暂无数据',
                })
                device.info(e,'error')
            })
        }

        if(device.isArray(options)){
            this.setState({
                options:options
            })
        }


    }

    val2ShowVal(){
        if(this.props.multiple){
            return this.props.defaultValue == ''? undefined : this.props.defaultValue.split(',');
        }else{
            return this.props.defaultValue == ''? undefined : this.props.defaultValue;
        }

    }

    showVal2Val(val:any){
        if(this.props.multiple){
            return (val??[]).join(',');
        }else{
            return val??'';
        }
    }

    updateOptions(options:any){
        this.setState({
            options:options
        })
    }

    renderInput(){
        const customProps:any = {};
        if(this.props.optionRender && device.isFunction(this.props.optionRender)){
            customProps.optionRender = (option:any) => {
                return this.props.optionRender(option)
            }
        }


        return <Select
            {...this.getInputProps()}
            {...customProps}
            maxTagCount={this.props.maxTagCount}
            mode={this.props.multiple? 'multiple': ''}
            allowClear  //显示清空按钮（效果不好看）
            showSearch
            prefix={this.props.iconRender()}
            loading={this.state.loading}
            defaultValue={this.state.showVal}
            className='w_100'
            notFoundContent={<div>{this.state.emptyText}</div>}
            variant={this.props.variant}
            size={this.props.inputSize}
            status={this.state.errMsg == ''? '' : 'error'}
            onChange={(value:any)=>{
                this.updateVal(value)
            }}
            options={this.state.options}
        />
    }
}


export default MySelect
