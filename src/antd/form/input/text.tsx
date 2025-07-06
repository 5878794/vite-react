

import base from "./base.tsx";
import {Input} from "antd";

class Text extends base{
    constructor(props:any) {
        super(props);
    }

    static defaultProps = {
        ...base.defaultProps,

    }

    renderInput(){
        return <Input className='w_100 h_100' placeholder="Basic usage" size='large' />
    }
}


export default Text
