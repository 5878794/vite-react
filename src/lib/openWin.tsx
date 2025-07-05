
import React from 'react';
import { createRoot } from 'react-dom/client';
import {ReactComponent} from "@/lib/defineComponent";
import {CloseOutlined,LoadingOutlined} from '@ant-design/icons'
import {Modal,Button,Skeleton} from 'antd';
import device from "@/lib/device.ts";
import mdfCss from '@/antd/mdf.module.scss'

class App {
    dom: any;
    app: any;

    constructor() {
        this.dom = '';
        this.app = '';
    }

    render(Component: any, props?: any) {
        const id = 'bens_' + new Date().getTime();
        this.dom = document.createElement('div');
        this.dom.id = id;
        this.dom.ref = id;
        document.body.appendChild(this.dom);

        this.app = createRoot(this.dom);
        this.app.render(<Component {...props} />);
    }


    close() {
        this.app.unmount();
        try{
            document.body.removeChild(this.dom);
        }catch(e:any){

        }
    }
}

class winComponent extends ReactComponent{
    constructor(props:any) {
        super(props);
        this.state = {
            isModalOpen:true,
            isLoading:this.props.needOpenLoading,
            btnLoadingState:[]
        }
    }

    static defaultProps = {
        title:'系统提示',
        footerBtns:[
            {label:'取消',type:'',click:(closeFn:any)=>{closeFn();}},
            {label:'确定',type:'primary',click:'onSubmit'},
        ],
        footerRender:()=>{return null}, //底部按钮前的渲染函数
        keyboard:true,      //是否支持键盘 esc 关闭
        mask:true,          //是否展示遮罩
        maskClosable:false,  //点击蒙层是否允许关闭
        width:600,          //宽度
        needOpenLoading:false //打开弹窗的时候显示loading
    }

    renderCom(){
        return <></>;
    }

    close(){
        this.setState({
            isModalOpen:false
        })
        this.closeApp();
    }

    closeApp(){}

    async btnClick(fnName:string){
        console.log('submit')
    }

    //底部按钮点击
    async footerBtnClick(btnProps:any){
        const closeFn = () => {this.close()}

        if(btnProps.click && device.isFunction(btnProps.click)){
            btnProps.click(closeFn)
        }

        if(btnProps.click && typeof btnProps.click == 'string'){
            await this.btnClick(btnProps.click);
        }
    }

    render(){
        return <Modal
            className={mdfCss.Modal}
            title={''}
            closable={false}
            open={this.state.isModalOpen}
            width={this.props.width}
            keyboard={this.props.keyboard}
            mask={this.props.mask}
            maskClosable={this.props.maskClosable}
            zIndex={1999}
            onCancel={()=>this.close()}
            footer={(_, { OkBtn, CancelBtn }) => {
                if(!this.state.isLoading){
                    return <div className='w_100 box_hrc'>

                        <div className='boxflex1 box_hlc'>
                            {this.props.footerRender && this.props.footerRender()}
                        </div>

                        {this.props.footerBtns.map((btn: any, i: number) => {
                            return <Button loading={this.state.btnLoadingState[i]} className='ml4 mr4' onClick={() => {
                                const btnState = this.state.btnLoadingState;
                                btnState[i] = true;
                                this.setState({
                                    btnLoadingState:btnState
                                })

                                this.footerBtnClick(btn).then(()=>{
                                    btnState[i] = false;
                                    this.setState({
                                        btnLoadingState:btnState
                                    })
                                }).catch(()=>{
                                    btnState[i] = false;
                                    this.setState({
                                        btnLoadingState:btnState
                                    })
                                });
                            }} key={'btn_' + i} type={btn.type}>{btn.label}</Button>
                        })}
                    </div>
                }else{
                    return null;
                }
            }}
        >
            <div className='w_100 h50 box_h_side_c pl20 pr10 fw'>
                <div className='boxflex1 diandian fs15'>{this.props.title}</div>
                <div className='w30 h30 hover box_hcc' onClick={() => this.close()}><CloseOutlined/></div>
            </div>

            <div className='pl20 pr20 pt10 __body__ small_scroll pR'>
                {/*{this.state.isLoading && <div className='w_100 h_100 box_hcc pA l0 t0'><LoadingOutlined className='fs32'/></div>}*/}
                {this.state.isLoading && <div className='w_100 h_100 box_slt p20 pA l0 t0 ofH'>
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                    <Skeleton className='mb50' active />
                </div>}
                <div style={{visibility:this.state.isLoading? 'hidden' : 'visible'}}>{this.renderCom()}</div>

            </div>


        </Modal>
    }

}


const openWinFn = (Component: any, props: any, resolve: any, reject: any, opt: any) => {
    const app = new App();
    class newWinCom extends winComponent{
        childRef = React.createRef();

        constructor(props:any) {
            super(props);
        }

        closeApp(){
            app.close();
        }

        async btnClick(fnName:string){
            const childCom = this.childRef.current as any;

            if(childCom[fnName]){
                await childCom[fnName]().then((rs:any)=>{
                    this.closeApp();
                    device.info('操作成功!','success');
                    resolve(rs);
                }).catch((err:any)=>{
                    device.alert(err,'error')
                    reject(err)
                });
            }else{
                throw `${fnName}方法在弹窗组件中不存在！！！！！`
            }
        }

        renderCom(){
            return <Component
                ref={this.childRef}
                {...props}
                openWinHideLoading={()=>{
                    this.setState({
                        isLoading:false
                    })
                }}
            />
        }

    }
    app.render(newWinCom,opt)
}




export default (component:any, props:any, opt:any) => {
    return new Promise((resolve,reject)=>{
        openWinFn(component, props, resolve, reject, opt);
    })
}
