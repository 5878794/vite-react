

import {ReactComponent,withNavigation} from "@/lib/defineComponent";
import {Table,Tooltip} from "antd";
import device from "@/lib/device.ts";
import React from 'react'

//TODO 输入控件 表格合并 样式控制

class myTable extends ReactComponent{
    tableRef = React.createRef(); // 创建一个 ref

    constructor(props:any) {
        super(props);


        this.state = {
            dataSource:this.handlerData(),
            columns:this.handlerSetting(),
            selected:this.props.selected,
            scrollYMaxHeight:500
        }
    }

    //setting的参数
        //参数说明   key:绑定的行数据的key
        //参数说明   label:表头显示的文字
        //参数说明   sort:数字列的排序
        //参数说明   customSort:自定义排序 (a,b)=>a.a-b.a   //a、b为行的数据
        //参数说明   format: type=date时显示时间格式化的参数   默认 YYYY-MM-DD   完整格式 YYYY-MM-DD hh:mm:ss
        //参数说明   width:列的宽度  单位px
        //参数说明   align:列的对齐方式 left | right | center   默认：left
        //参数说明   fixed:滚动时固定不动  left | right
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

        totalKeys:[],    //需要合计的字段key  第一列默认写成合计，如果要统计第一列setting中要加一个空列
        loading:false,  //是否加载中
    }

    ready(){
        this.autoSetTableMaxHeight();
    }

    //自动设定table的最大高度，滚动需要
    autoSetTableMaxHeight(){
        const dom = (this.tableRef.current as any).children[0];
        const run = () => {
            const header = dom.getElementsByClassName('ant-table-header')[0];
            const summer = dom.getElementsByClassName('ant-table-summary')[0];

            this.setState({
                scrollYMaxHeight:dom.parentElement.offsetHeight-(header?.offsetHeight??0)-(summer?.offsetHeight??0)
            })
        }

        run();

        window.onresize = () => {
            run();
        }
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
                        render:(data:any)=> {
                            // return <Tooltip placement="topLeft" title={data}>
                            //     <div className="diandian" style={{width: rs.width + 'px'}}>{data}</div>
                            // </Tooltip>
                            return <div className="diandian" style={{width: rs.width + 'px'}}>{data}</div>
                        }
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

            if(rs.width){
                thisObj.width = rs.width
            }

            if(rs.fixed){
                thisObj.fixed = rs.fixed
            }

            if(rs.align){
                thisObj.align = rs.align
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

    //计算合计
    renderTotal(data:any){
        const total:any = {};
        this.props.totalKeys.map((rs:any)=>{
            total[rs] = 0;
        })

        data.map((rs:any)=>{
            this.props.totalKeys.map((key:string)=>{
                total[key] = total[key] + (rs[key]??0)
            })
        })


        if(this.props.totalKeys && this.props.totalKeys.length > 0){
            return (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        {this.props.selectType && <Table.Summary.Cell key='__total__' index={0}></Table.Summary.Cell>}
                        {this.props.setting.map((rs:any,i:number)=>{
                            if(i==0){
                                return <Table.Summary.Cell key={'__total__'+i}  index={i}>合计</Table.Summary.Cell>
                            }else{
                                return <Table.Summary.Cell key={'__total__'+i} index={i}>{total[rs.key]}</Table.Summary.Cell>
                            }
                        })}
                    </Table.Summary.Row>
                </Table.Summary>
            );

        }else{
            return null
        }
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
            ref={this.tableRef as any}
            className={'h_100 w_100'}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            rowSelection={rowSelection}
            pagination={false}
            // bordered
            // size="small"
            summary={(data:any)=>{return this.renderTotal(data)}}
            loading={this.props.loading}
            scroll={{
                x:'max-content',
                y:this.state.scrollYMaxHeight+'px'
            }}
        />
    }

}


export default myTable;
