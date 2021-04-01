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
    params:data
  })
}


