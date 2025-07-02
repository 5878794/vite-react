import _ from 'lodash';
import {formatDate} from "@/lib/dateTime.ts";

export default {
    publicSrc:import.meta.env.VITE_BASE_URL,
    isEmpty:(val:any)=>{return _.isEmpty(val)},
    isBool:(val:any)=>{return _.isBoolean(val)},
    isNaN:(val:any) => {return _.isNaN(val)},
    isArray:(val:any)=>{return _.isArray(val)},
    isObj:(val:any)=>{return _.isPlainObject(val)},
    cloneJson:(json:any)=>{return _.cloneDeep(json);},
    isFunction:(val:any)=>{return _.isFunction(val)},
    formatDate:formatDate
}
