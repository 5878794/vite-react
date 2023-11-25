
import React from "react";
import index from "./routes";
import {RouterProvider} from "react-router-dom";

export default class extends React.Component{
    constructor(props:any) {
        super(props);
    }

    render(){
        return <RouterProvider router={index} />
    }
}
