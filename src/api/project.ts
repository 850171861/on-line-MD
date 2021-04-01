import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const project = () => {
  return axios.request({
    url: '/project/get',
    method: 'GET'
  })
}
