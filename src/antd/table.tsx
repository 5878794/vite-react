

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
        //参数说明   key:绑定的行数据的key
        //参数说明   label:表头显示的文字
        //参数说明   sort:数字列的排序
        //参数说明   customSort:自定义排序 (a,b)=>a.a-b.a   //a、b为行的数据
        //参数说明   format: type=date时显示时间格式化的参数   默认 YYYY-MM-DD   完整格式 YYYY-MM-DD hh:mm:ss
        //参数说明   type:显示类型
            // text：文本
            // date:时间戳显示成日期
            // custom:自定义渲染组件 执行render函数渲染



        // {label:'列1',type:'text',key:'a',sort:true},      //sort排序
        // {label:'列444',type:'text',key:'aa',customSort:(a:any,b:any)=>{       //customSort 自定义排序a、b为行数据
        //     return (a.aa??0)-(b.aa??0)
        // }},
        // {label:'列1',type:'date',key:'b',format:'YYYY-MM-DD hh:mm:ss'},   //type:date  时间戳显示成文字
        // {label:'列2',type:'custom',render:(rowData:any)=>{                //render 自定义渲染
        //     return <a>{rowData.c}</a>
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
                            const fmt = rs.format? rs.format : 'YYYY-MM-DD';
                            return device.formatDate(data,fmt)
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

            //判断是否有排序
            if(rs.sort){
                thisObj.sorter = (a:any,b:any) => {
                    return (a[rs.key]??0) - (b[rs.key]??0)
                }
            }

            //判断是否有自定义排序
            if(rs.customSort){
                thisObj.sorter = rs.customSort;
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
