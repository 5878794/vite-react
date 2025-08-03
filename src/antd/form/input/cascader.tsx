

import MySelect from "./select.tsx";
import {Cascader} from "antd";
import device from "@/lib/device.ts";

//value 进出都是最后一层的值
class MyCascader extends MySelect{
    constructor(props:any) {
        super(props);
    }

    //获取最终值的路径
    getDataPath(val:any){
        const opt = this.state.options??[];
        let find = false;
        let findPath:any = [];

        const loop = (opts:any,path:any) => {
            if(!find){
                opts.map((rs:any)=>{
                    const thisPath = path? path.split(',') : [];
                    thisPath.push(rs.value);
                    if(rs.value == val){
                        find = true;
                        findPath = thisPath;
                    }else{
                        if(rs.children){
                            loop(rs.children,thisPath.join(','))
                        }
                    }
                })
            }
        }
        loop(opt,'');
        return findPath;
    }

    val2ShowVal(){
        let newBack:any = [];
        let data =  this.props.defaultValue == ''? [] : this.props.defaultValue.split(',');
        if(this.props.multiple){
            data.map((rs:any)=>{
                const path = this.getDataPath(rs);
                if(path.length != 0){
                    newBack.push(path)
                }
            })
        }else{
            const path = this.getDataPath(data);
            if(path.length != 0){
                newBack = path;
            }
        }

        return newBack;
    }

    showVal2Val(val:any){
        let newBack:any = [];
        val = val ?? [];
        if(this.props.multiple){
            val.map((rs:any)=>{
                newBack.push(rs[rs.length-1])
            })
        }else{
            newBack.push(val[val.length-1])
        }

        return newBack.join(',');
    }


    renderInput(){
        const customProps:any = {};
        if(this.props.optionRender && device.isFunction(this.props.optionRender)){
            customProps.optionRender = (option:any) => {
                return this.props.optionRender(option)
            }
        }


        return <Cascader
            {...this.getInputProps()}
            {...customProps}
            maxTagCount={this.props.maxTagCount}
            multiple={this.props.multiple}
            allowClear  //显示清空按钮（效果不好看）
            showSearch
            prefix={this.props.iconRender()}
            showCheckedStrategy={Cascader.SHOW_CHILD}
            loading={this.state.loading}
            value={this.state.showVal}
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


export default MyCascader
