import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

interface VerificationInterface {
    username: string;
    name: string;
    password: number | string;
}

interface RegisterInterface {
    username: string;
    name: string;
    password: string;
    ver: number | string;
}

interface ResetPwdInterface {
    username: string;
    password: string;
    ver: number | string;
}

interface LoginInterface {
    username: string;
    password: string;
}


export const verification = (data: VerificationInterface): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/login/ver',
        data: data,
        method: 'POST'
    })
}

export const register = (data: RegisterInterface): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/login/reg',
        data: data,
        method: 'POST'
    })
}

export const resetPwd = (data: ResetPwdInterface): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/login/reset',
        data: data,
        method: 'POST'
    })
}

export const login = (data: LoginInterface): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/login/login',
        data: data,
        method: 'POST'
    })
}


