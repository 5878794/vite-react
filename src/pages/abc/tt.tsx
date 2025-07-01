

import {ReactComponent,withNavigation} from "@/lib/defineComponent";
import { Outlet } from "react-router-dom";
import Menu from "@/antd/menu.tsx";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import React from "react";
import device from "@/lib/device.ts";

const items = [
    { key: '1', icon: <PieChartOutlined />, label: 'Option 1',url:'/abc/tt/1' },
    { key: '2', icon: <img src={device.publicSrc+'vite.svg'}/>, label: 'Option 2',url:'/abc/tt/2' },
    { key: '3', icon: <ContainerOutlined />, label: 'Option 3',url:'3' },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: 'sub3', label: 'Submenu', children: [
                    { key: '11', label: 'Option 11',url:'4' },
                    { key: '12', label: 'Option 12',url:'5' },
                ],
            },
        ],
    },
];

class abc extends ReactComponent{
    constructor(props:any) {
        super(props);

        this.state = {
            items:[]
        }
    }

    pageChange(path:number){
        this.props.navigate('/abc/tt/'+path)
    }

    ready(){
        setTimeout(()=>{
            this.setState({
                items:items
            })
        },3000)
    }

    render(){
        return <div className='w100 h100 box_hlt'>
            <div className='w300 h100 bgRed'>
                <Menu data={this.state.items}/>
            </div>
            <div style={{width:'300px',height:'100vh'}}>
                <Outlet />
            </div>
        </div>
    }
}


export default withNavigation(abc)
