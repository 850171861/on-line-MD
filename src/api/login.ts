import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'
interface LoginReqArguInterface {
    username: string;
    name: string;
    password: number | string;

}
export const register = (data: LoginReqArguInterface): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/login/ver',
        data: data,
        method: 'POST'
    })
}
