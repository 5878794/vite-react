

import {ReactComponent,withNavigation} from "@/lib/defineComponent";
import {Table} from "antd";
import device from "@/lib/device.ts";


class myTable extends ReactComponent{
    constructor(props:any) {
        super(props);


        this.state = {
            dataSource:this.handlerData(),
            columns:this.handlerSetting(),
            selected:this.props.selected,
        }
    }

    //setting的参数
        // {label:'列1',type:'text',key:'a'},
        // {label:'列2',type:'custom',render:(rowData:any)=>{
        //     return <a>{rowData.b}</a>
        // }},
    static defaultProps = {
        setting:[],
        data:[],    //数据中最好带id，否则会自动生成每行的key，格式 row_i

        //行选择的操作
        selectType:null,     //  null  | checkbox | radio  如果为null下面2个参数无效
        onSelect:null,  //  null  |  (selectedRowkeys)=>{...}
        selected:[],     //当前选中的行的key

    }

    //处理表格配置
    handlerSetting(){
        const newSetting:any = [];
        let i = 0;

        this.props.setting.map((rs:any)=>{
            i++
            let thisObj:any = {};

            switch (rs.type){
                case 'text':
                    thisObj = {
                        title: rs.label,
                        dataIndex: rs.key,
                        key: 'col_'+i,
                    }
                    break;
                case 'date':
                    thisObj = {
                        title: rs.label,
                        dataIndex: rs.key,
                        key: 'col_'+i,
                        render:(data:any)=>{
                            return device.formatDate(data,'YYYY-MM-DD hh:mm:ss')
                        }
                    }
                    break;
                case 'custom':
                    thisObj = {
                        title: rs.label,
                        key: 'col_'+i,
                        render:(rowData:any)=>{
                            return rs.render(rowData)
                        }
                    }
                    break;
                default:
                    thisObj = {
                        title: rs.label,
                        dataIndex: rs.key,
                        key: 'col_'+i,
                    }
            }

            newSetting.push(thisObj);
        })
        return newSetting;
    }

    //处理表格传入数据
    handlerData(){
        let d = 0;
        const newData:any = [];
        this.props.data.map((rs:any)=>{
            d++;
            rs.key = (rs.id)? rs.id : 'row_'+d;
            newData.push(rs)
        })
        return newData;
    }


    render(){
        const rowSelection:any = !this.props.selectType? null : {
            type:this.props.selectType,
            selectedRowKeys:this.state.selected,
            onChange:(data:any)=>{
                this.setState({
                    selected:data
                })

                if(device.isFunction(this.props.onSelect)){
                    this.props.onSelect(data)
                }
            }
        }

        return <Table
            className='w_100 h_100'
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            rowSelection={rowSelection}
            pagination={false}
        />
    }

}


export default myTable;
