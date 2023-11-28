

import {ReactComponent,defineComponent,Slot} from "@/lib/defineComponent";

class Page extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    static defaultProps = {
        aaa:111
    }

    ready(){
    }

    log(val:any){
        console.log(val)
    }

    clickFn(){
        this.log(12)
    }

    render(){

        return <div>
            <div>
                <Slot name='aa'></Slot>
                <div>---------------------</div>
                <Slot></Slot>
                <Slot name='bb'></Slot>
            </div>

        </div>
    }
}


export default Page;
