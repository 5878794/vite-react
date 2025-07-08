

import base from "@/antd/form/input/base.tsx";



class TestCom extends base{
    constructor(props:any) {
        super(props);
        this.state = {
            errMsg:'',
            showVal:this.val2ShowVal(),
            val:this.props.defaultValue
        }
    }

    //完全改写  只改写输入框部分可以改写 renderInput
    render(){
        return <input type='text' className='w_100 h40 bC' value={this.props.defaultValue} onInput={(e:any)=>{
            this.updateVal(e.target.value)
        }}/>
    }
}


export default TestCom;
