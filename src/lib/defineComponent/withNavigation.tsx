import React from 'react';
import { useNavigate } from 'react-router-dom';


//方便页面跳转包装的函数  最终输出时候用  withNavigation(react class)

//类中可以使用   this.props.navigate('/abc/1')  实现页面跳转

export function withNavigation(Component:any) {
    return function WrappedComponent(props:any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}
