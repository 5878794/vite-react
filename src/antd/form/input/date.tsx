

import base from "./base.tsx";
import {DatePicker} from "antd";
import dayjs from 'dayjs';

class Date extends base{

    constructor(props:any) {
        super(props);

    }

    static defaultProps = {
        ...base.defaultProps,
        placeholder:base.defaultProps.placeholder || '请选择',
        picker:undefined,      //周：week 月：month  季度：quarter 年：year
        showTime:false,
        format:undefined,      //YYYY-MM-DD HH:mm:ss
        min:-631152000000,  //1950-1-1
        max:2240524800000,   //2040-12-31
        hideHours:[],       //0-23       [22,23] 不显示22 23 小时
        hideMinutes:[],     //0-59
        hideSeconds:[]      //0-59
    }

    getRange(start: number, end: number){
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    //数据转显示值
    val2ShowVal(){
        return this.props.defaultValue? dayjs(parseInt(this.props.defaultValue)) : undefined;
    }

    //显示值转数据
    showVal2Val(val:any){
        return val? val.toDate().getTime() : undefined;
    }

    renderInput(){
        return <DatePicker
            showTime={this.props.showTime}
            {...this.getInputProps()}
            minDate={dayjs(parseInt(this.props.min))}
            maxDate={dayjs(parseInt(this.props.max))}
            disabledTime={()=> ({
                disabledHours:()=>this.props.hideHours,
                disabledMinutes:()=>this.props.hideMinutes,
                disabledSeconds:()=>this.props.hideSeconds
            })}
            className='w_100'
            variant={this.props.variant}
            value={this.state.showVal}
            prefix={this.props.iconRender()}
            size={this.props.inputSize}
            status={this.state.errMsg == ''? '' : 'error'}
            format={this.props.format}
            onChange={(e:any,d:any)=>{
                console.log(e)
                this.updateVal(e)
            }}
        />
    }
}


export default Date
