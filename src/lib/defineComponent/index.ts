//ReactComponent 用于类的继承  增加咯一些自己的实现方式
export {ReactComponent, defineComponent} from './component.tsx';

//组件下注入变量
export {Provide,Inject} from './provideInject.tsx';

//slot封装
export {Slot} from "./slot.tsx";

//方便页面跳转使用  最终输出的时候   withNavigation(react class)
//类中可以使用 this.props.navigate('/abc/1')  实现页面跳转
export {withNavigation} from './withNavigation.tsx'

