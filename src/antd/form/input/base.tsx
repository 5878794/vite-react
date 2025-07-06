

import {ReactComponent} from "@/lib/defineComponent";
import css from '../form.module.scss'

class Base extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            errMsg:'',
            showVal:this.val2ShowVal()
        }

        this.watchProp('defaultValue',()=>{
            this.setState({
                showVal:this.val2ShowVal()
            })
        })
    }

    static defaultProps = {
        style:{},
        label:'',
        _key:'',            //唯一标识
        key:'',
        rule:'',                //验证规则
        labelChangeRow:false,   //label是否换行
        labelStyle:{},
        showRequire:true,   //是否显示必填*
        updateValue:(_key:string,val:any)=>{}, //更新value的函数
        defaultVal:'',  //默认值
        afterInputRender:()=>null,  //输入框后面的说明文字

        defaultValue:'',    //默认值
        disabled:false, //是否禁用
        status:'',      //设置校验状态
    }



    //数据转显示值
    val2ShowVal(){
        return this.props.defaultVal;
    }

    //显示值转数据
    showVal2Val(val:any){
        return val;
    }

    updateVal(val:any){
        this.props.updateValue(this.props._key,val);
    }

    renderInput(){
        return <></>
    }

    render(){
        const bodyClass = this.props.labelChangeRow? 'box_slt pl4 pr4' : 'box_hlt pl4 pr4';

        //label的style
        const inputHeight = '34px';
        let labelStyle = this.props.labelChangeRow?{width:'100%'} : {width:'120px'};
        labelStyle = Object.assign({minHeight:inputHeight,lineHeight:inputHeight,marginRight:'4px'},labelStyle,this.props.labelStyle);

        //判断是否必填
        const isRequire = this.props.rule.indexOf('require') > -1;

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


                <div className='w_100 h18 box_hlt diandian fs14 fcRed'>{this.state.errMsg}</div>
            </div>

        </div>
    }
}


export default Base
