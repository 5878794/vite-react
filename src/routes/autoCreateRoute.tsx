
//自动生成路由
//自动读取传入的路径(../pages/)下的文件自动生成路由
//读取规则:
//读取根文件夹下的文件 *.vue *.tsx 自动写入route的跟下（文件名不能重复vue和tsx的）
//读取根文件夹下的文件夹（平级必须有同名的文件才会写入）写入route的children下
//递归读取



import { Outlet } from "react-router-dom";
import ErrorPage from "./errorPage.tsx";
import {lazy} from "react";

const allPage = import.meta.glob(
  ['../pages/**/*.jsx','../pages/**/*.tsx'],
  {
    eager: true,  // 改成 具体模块导出的值,在 default 下面
    import: 'default'  // 配置默认就导出模块中的 default 属性
  }
);

const getPathDist = (path:string) => {
  const back:any = {};
  for(let [key,val] of Object.entries(allPage)){
    key = key.replace(path,'');
    key = key.split('.')[0];
    const keyArr = key.split('\/');

    let nowBack = back;
    for(let i=0,l=keyArr.length;i<l;i++){
      const nowPath = keyArr[i];
      if(!nowBack[nowPath]){
        nowBack[nowPath] = {
          item:{},
          children:{}
        };
      }

      //最后个
      if(i == keyArr.length -1){
        nowBack[nowPath].item.name = nowPath;
        nowBack[nowPath].item.path = '/'+nowPath;
        nowBack[nowPath].item.component = val;
      }

      nowBack = nowBack[nowPath].children;
    }
  }

  return back;
}

const createRoute = (dist:any) => {
  console.log(dist)
  const route:any = [];
  const fn = (obj:any,route:any,root?:boolean) => {
    for(let [key,val] of Object.entries(obj)){
      const item = (val as any).item;
      const Com = item.component;
      let thisRoute:any;
      if(item.name) {
        thisRoute = {
          // name:item.name,
          path: root ? '/' + item.name : item.name,
          element: <Com/>,
          errorElement:<ErrorPage/>,
          children: []
        }
      }else{
        //使用空页面
        thisRoute = {
          // name:item.name,
          path: root ? '/' + key : key,
          element: <Outlet/>,
          errorElement:<ErrorPage/>,
          children: []
        }
      }


      route.push(thisRoute);

      const children = (val as any).children;
      fn(children,thisRoute.children,false)

    }
  }
  fn(dist,route,true);

  return route;
}

export default function(path:string){
  const dist = getPathDist(path);
  return createRoute(dist);
}
