
import {ReactComponent} from "@/lib/defineComponent";
import Table from '@/antd/table.tsx'

//Table组件的demo

class Page extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            setting:[
                {label:'列1',type:'text',key:'a',sort:true,width:100,fixed: 'left'},
                {label:'列444',width:2000,type:'text',align:'center',key:'aa',customSort:(a:any,b:any)=>{
                    return (a.aa??0)-(b.aa??0)
                }},
                {label:'列1',width:150,type:'date',key:'b',format:'YYYY-MM-DD'},
                {label:'列2',type:'custom',width:100,fixed:'right',render:(rowData:any)=>{
                    return <a>{rowData.c}</a>
                }},
            ],
            data:[  //最好带id字段，应为每行数据要有自己的key，否则会自动生成 row_i 的key
                {id:1,a:'阿萨地方噶开始两地分居阿迪斯李逵负荆阿斯利康电极法',aa:33,b:new Date().getTime(),c:3},
                {id:2,a:2,aa:55,b:Math.floor(new Date().getTime()/1000),c:3},
                {id:3,a:5,aa:64,b:2,c:3},
                {id:4,a:11,aa:3,b:2,c:3},
                {id:5,a:22,aa:6,b:2,c:3},
                {id:6,a:34,aa:4,b:2,c:3},{id:8,a:1,b:2,c:3},
                {id:7,a:3,aa:22,b:2,c:3},
            ],
            loading:true
        }
    }

    ready(){
        setTimeout(()=>{
            this.setState({loading:false})
        },2000)
    }

    render(){
        return <div className='box_slt h_100'>
            <div>11111</div>
            <div className='boxflex1 w_100'>
                <Table
                    setting={this.state.setting}
                    data={this.state.data}

                    //设置每行前面的选择
                    selected={[1,2,4]}
                    onSelect={(rs:any)=>{
                        console.log(rs)
                    }}
                    // selectType='checkbox'
                    totalKeys={['aa']}

                    loading={this.state.loading}
                />
            </div>

        </div>
    }
}


export default Page;
