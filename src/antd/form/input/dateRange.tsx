

import base from "./base.tsx";
import {DatePicker} from "antd";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

class DateRange extends base{

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
        hideSeconds:[],      //0-59
        disableds:[false, false],
        allowEmpty:[true,true]
}

    //数据转显示值
    val2ShowVal(){
        const date = this.props.defaultValue? this.props.defaultValue.split(',') : [];

        return (!date[0] && !date[1])? '' : [
            date[0]? dayjs(parseInt(date[0])) : undefined,
            date[1]? dayjs(parseInt(date[1])) : undefined,
        ];
    }

    //显示值转数据
    showVal2Val(val:any){
        val = val? val : [];
        const date1 = val[0];
        const date2 = val[1];

        return (!date1 && !date2)? '' : [
            date1? date1.toDate().getTime() : '',
            date2? date2.toDate().getTime() : '',
        ].join(',');
    }

    renderInput(){
        return <RangePicker
            showTime={this.props.showTime}
            {...this.getInputProps()}
            disabled={this.props.disableds}
            allowEmpty={this.props.allowEmpty}
            minDate={dayjs(parseInt(this.props.min))}
            maxDate={dayjs(parseInt(this.props.max))}
            needConfirm={false}
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
                this.updateVal(e)
            }}
        />
    }
}


export default DateRange
