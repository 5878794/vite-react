

import {ReactComponent} from "@/lib/defineComponent";
import _ from 'lodash'
import css from '../form.module.scss'
import ruleCheck from "@/antd/form/ruleCheck.ts";
import React from "react";

class Base extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            errMsg:'',
            showVal:this.val2ShowVal(),
            val:this.props.defaultValue
        }

        this.watchProp('defaultValue',()=>{
            this.setState({
                showVal:this.val2ShowVal()
            })
        })

        this.watchState('showVal',()=>{
            this.checkInput(true);
        })
    }

    static defaultProps = {
        style:{},
        label:'',
        _key:'',            //唯一标识
        rule:'',                //验证规则
        labelChangeRow:false,   //label是否换行
        labelStyle:{},
        showRequire:true,   //是否显示必填*
        variant:'outlined',         //输入框样式     outlined | borderless | filled | underlined
        updateValue:(_key:string,val:any)=>{}, //更新value的函数
        afterInputRender:()=>null,  //输入框后面的说明文字
        placeholder:'',
        getFormRef:()=>{},
        errMsg:'',  //验证错误固定提示文字
        inputSize:'large',  //输入框大小
        iconRender:()=>null,

        defaultValue:'',    //默认值
        disabled:false, //是否禁用

        renderFn:null,   //(obj:any,form:any)=>{}   渲染时执行
        changeFn:null,   //(val:any,obj:any,form:any)=>{}  值变化的时候
    }



    //数据转显示值
    val2ShowVal(){
        return this.props.defaultValue;
    }

    //显示值转数据
    showVal2Val(val:any){
        return val;
    }

    //检查输入框
    //@linkCheck:是否检查关联的输入框
    checkInput(linkCheck:boolean){
        const form = this.getFormRef();

        //判断是否有关联的input
        if(form.linkCheck[this.props._key] && linkCheck){
            form.linkCheck[this.props._key].map((key:any)=>{
                form.find(key).checkInput(false);
            })
        }


        const rs = ruleCheck(this.props.rule,this.state.showVal,this.props.errMsg,form);
        if(rs.pass){
            this.setState({
                errMsg:''
            })
        }else{
            this.setState({
                errMsg:rs.msg
            })
        }

        //跟新数据
        let val = this.showVal2Val(this.state.showVal);
        this.setState({
            val:val
        })
        this.props.updateValue(this.props._key,val);


        if(this.props.changeFn && linkCheck){
            this.props.changeFn(val,this,form);
        }

        return rs.pass;
    }

    updateVal(val:any){
        this.setState({
            showVal:val
        })
        //check 放到咯state的监听上  constructor中
    }

    renderInput(){
        return <></>
    }

    //获取Form组件的ref
    getFormRef(){
        return this.props.getFormRef()
    }

    getInputProps(){
        const props = _.cloneDeep(this.props);
        delete props._key;
        delete props.style;
        delete props.label;
        delete props.rule;
        delete props.labelChangeRow;
        delete props.labelStyle;
        delete props.showRequire;
        delete props.updateValue;
        delete props.afterInputRender;
        delete props.iconRender;
        delete props.unit
        delete props.getFormRef
        delete props.errMsg
        delete props.inputSize
        delete props.when
        delete props.value
        delete props.renderFn
        delete props.changeFn


        return props;
    }

    render(){

        const bodyClass = this.props.labelChangeRow? 'box_slt pl4 pr4' : 'box_hlt pl4 pr4';

        //label的style
        const inputHeight = '34px';
        let labelStyle = this.props.labelChangeRow?{width:'100%'} : {width:'120px'};
        labelStyle = Object.assign({minHeight:inputHeight,lineHeight:inputHeight,marginRight:'4px'},labelStyle,this.props.labelStyle);

        //判断是否必填
        const isRequire = this.props.rule.indexOf('require') > -1;

        if(this.props.renderFn){
            const form = this.getFormRef();
            this.props.renderFn(this,form);
        }


        return <div className={`${css.base} ${bodyClass}`} style={this.props.style}>
            {/*渲染label*/}
            {this.props.label && <div style={labelStyle}>
                {isRequire && this.props.showRequire && <span className='fcRed fs16 pR' style={{top:'4px'}}>*</span>}
                {this.props.label}：
            </div>}

            <div className='boxflex1 box_slt'>
                <div className='w_100 box_hlc' style={{height:inputHeight}}>
                    {/*渲染输入框*/}
                    <div className='boxflex1 ofH'>
                        {this.renderInput()}
                    </div>

                    {/*输入框后的说明文字*/}
                    {this.props.afterInputRender()}
                </div>


                <div className='w_100 h24 box_hlt pt2 diandian fs14 fcRed'>{this.state.errMsg}</div>
            </div>

        </div>
    }
}


export default Base
