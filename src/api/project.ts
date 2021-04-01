import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'



interface CreateProjectInterface {
  name: string;
  description: string;
  plugins?: boolean;
  password?: string;
  [roles: string]: any
}

interface ProjectInterface {
  projectId?: string
}

export const createProject = (data: CreateProjectInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/create',
    method: 'POST',
    data
  })
}

export const project = (data: ProjectInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/project/get',
    method: 'GET',
    data
  })
}


