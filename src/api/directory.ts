import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

interface CreateDirectory {
   projectId:any;
   name:string
}
interface GetDirectory {
   projectId:any
}

interface UpdateDirectory {
   projectId:any;
   directory_id:string;
   name:string
}

interface DeleteDirectory {
   projectId:any;
   directory_id:string;
}



export const createDirectory = (data: CreateDirectory): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/directory/create',
        data: data,
        method: 'POST'
    })
}
export const getDirectory = (data: GetDirectory): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/directory/get',
        data: data,
        method: 'POST'
    })
}

export const updateDirectory = (data: UpdateDirectory): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/directory/update',
        data: data,
        method: 'POST'
    })
}

export const deleteDirectory = (data: DeleteDirectory): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/directory/get',
        data: data,
        method: 'POST'
    })
}



