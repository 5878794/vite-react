import {defineComponent, ReactComponent} from "@/lib/defineComponent";
import Test3 from "@/components/test3.tsx";

class Page extends ReactComponent {
    constructor(props: any) {
        super(props);
    }

    static defaultProps = {
        bbb: 222
    }

    log(val:any){
        console.log(val)
    }

    clickFn(){
        this.log(12)
    }

    render() {
        return <div>
            <Test3>
                <div v-slot='aa' onClick={()=>this.clickFn()}>111</div>
                <div v-slot='bb'>222</div>
                <div>333</div>
            </Test3>
        </div>
    }
}

export default Page
