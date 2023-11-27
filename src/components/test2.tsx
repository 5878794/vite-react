import {defineComponent,ReactComponent,Inject} from "../lib/defineComponent.tsx";


class Test2 extends ReactComponent{
    constructor(props:any) {
        super(props);
    }

    @Inject('aaa')
    render(aaa:any){
        return <>
            <div>{aaa}</div>
        </>
    }
}




export default defineComponent(Test2);
