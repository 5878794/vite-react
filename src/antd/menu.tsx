import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {ReactComponent} from "@/lib/defineComponent";
import device from "@/lib/device.ts";
import {withNavigation} from "@/lib/defineComponent";




class newMenu extends ReactComponent{
    distCatch:any={};
    constructor(props:any) {
        super(props);
        this.state = {
            collapsed:device.isBool(props.min)? props.min : false,
            menuData:props.data
        }

        this.getMenuDist();
        this.watchProp('data',(old:any,newVal:any)=>{
            this.getMenuDist();
            this.setState({
                menuData:this.props.data
            })
        })
    }

    static defaultProps = {
        min:false,      //初始时是否最小化菜单
        defaultSelect:'',   //初始默认选中那个菜单的key
        defaultOpen:[],     //初始默认打开哪些菜单
        data:[],             //菜单数据  data=[key:'str',icon:'dom',label:'str',url:'str',children:[...]] icon和children非必填
        click:null    //点击执行 默认执行跳转页面  可以传入函数自己处理
    }

    //将菜单json转对象 方便获取url
    getMenuDist(){
        const newObj:any = {};
        const loopFn = (data:any) => {
            data.map((rs:any)=>{
                newObj[rs.key] = rs.url
                if(rs.children){
                    loopFn(rs.children)
                }
            })
        }
        loopFn(this.props.data);
        this.distCatch = newObj;
    }

    toggleCollapsed(){
        this.setState({
            collapsed:!this.state.collapsed
        })
    }

    itemClick(data:any){
        if(device.isFunction(this.props.click)){
            this.props.click(data)
        }else{
            const key = data.key;
            const url = this.distCatch[key];
            this.pageTo(url)
        }
    }

    render(){
        return (
            <div style={{ width: '100%' }}>
                <Button type="primary" onClick={()=>this.toggleCollapsed()} style={{ marginBottom: 16 }}>
                    {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    defaultSelectedKeys={[this.props.defaultSelect]}
                    defaultOpenKeys={this.props.defaultOpen}
                    mode="inline"
                    // theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    items={this.state.menuData}
                    onClick={(item:any)=>{
                        this.itemClick(item)
                    }}
                />
            </div>
        );
    }
}



export default withNavigation(newMenu);
