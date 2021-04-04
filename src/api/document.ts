import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

interface CreateDocument {
   projectId:any;
   directoryId:string;
   title:string;
   content:string;
}

interface GetDocument {
   id:string
}

interface DeleteDocument {
   projectId:any;
   directoryId:string;
   id:string
}

interface UpdateDocument {
   id:any;
   title:string;
   content:string;
   projectId:any;
   directoryId:string;
}




export const createDirectory = (data: CreateDocument): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/document/create',
        data: data,
        method: 'POST'
    })
}

export const getDocument = (data: GetDocument): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/document/get',
        params: data,
        method: 'get'
    })
}

export const deleteDocument = (data: DeleteDocument): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/document/delete',
        data,
        method: 'POST'
    })
}

export const updateDocument = (data: UpdateDocument): AxiosPromise<ResponseData> => {
    return axios.request({
        url: '/document/update',
        data,
        method: 'POST'
    })
}
