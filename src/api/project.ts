import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'



interface CreateAndUpdateProject {
  name: string;
  description: string;
  plugins?: boolean;
  password?: string;
  [roles: string]: any
}

interface ProjectInterface {
  projectId?: any
}

interface AddMember {
  username: string;
  name: string;
  description: string;
  publics?: boolean;
  password?: string;
  uuid: string;
  [roles: string]: any;
}

interface deleteMember {
  id: string;
  uuid: string;
}


interface GetMember {
  uuid: string
}

interface transferProject {
  username: string;
  password: string;
  uuid: string
}


export const createProject = (data: CreateAndUpdateProject): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/create',
    method: 'POST',
    data
  })
}

export const updateProject = (data: CreateAndUpdateProject): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/update',
    method: 'POST',
    data
  })
}

export const project = (data: ProjectInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/get',
    method: 'GET',
    params: data
  })
}

export const addmember = (data: AddMember): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/addMember',
    method: 'POST',
    data
  })
}

export const getmember = (data: GetMember): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/getMember',
    method: 'GET',
    params: data
  })
}

export const deletemember = (data: deleteMember): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/delMember',
    method: 'POST',
    data
  })
}


export const transferProject = (data: transferProject): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/transferProject',
    method: 'POST',
    data
  })
}

