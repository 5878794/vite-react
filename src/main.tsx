// import React from 'react'
import ReactDOM from 'react-dom/client'
import './baseStyle.scss'
import App from './app.tsx';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 引入中文语言包
import 'dayjs/locale/zh-cn'; // 日期中文

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
)
