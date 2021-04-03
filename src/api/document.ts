import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

interface CreateDocument {
   projectId:any;
   directoryId:string;
   title:string;
   content:string;
}


export const createDirectory = (data: CreateDocument): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/document/create',
        data: data,
        method: 'POST'
    })
}


