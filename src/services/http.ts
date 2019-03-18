import axios, { AxiosRequestConfig as _AxiosRequestConfig } from 'axios'
import * as qs from 'qs'
import { message } from 'antd'

import { getCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date
}

export interface HttpResquest {
    get(url: string, data: object, baseUrl?: string): Promise<any>
    post(url: string, data: object, baseUrl?: string): Promise<any>
    delete(url: string, data: object, baseUrl?: string): Promise<any>
    put(url: string, data: object, baseUrl?: string): Promise<any>
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR
}

const TOKENERROR = [401, 402, 403]

console.log(process.env.BASEURL);
const DEFAULTCONFIG = {
    baseURL: process.env.BASEURL
}

const http: PlainObject = {}
const methods = ['get', 'post', 'put', 'delete']

let authTimer: number = 0

interface IRES {
    errCode: number
    response: object
    data: object
}

const isSuccess = (res: IRES) => res.errCode === 0
const resFormat = (res: IRES) => res.response || res.data || {}

methods.forEach(v => {
    http[v] = (url: string, data: object, baseUrl?: string) => {
        const axiosConfig: AxiosRequestConfig = {
            method: v,
            url,
            baseURL: baseUrl || DEFAULTCONFIG.baseURL,
            headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.TOKEN)}` }
        }
        const instance = axios.create(DEFAULTCONFIG)
        // Add a request interceptor
        instance.interceptors.request.use(
            cfg => {
                const ts = Date.now() / 1000
                const queryData = { ts }
                cfg.params = { ...cfg.params, ...queryData }
                return cfg
            },
            error => Promise.reject(error)
        )
        // Add a response interceptor
        instance.interceptors.response.use(
            (response) => {
                let rdata = null
                if (typeof response.data === 'object' && !isNaN(response.data.length)) {
                    rdata = response.data[0]
                } else {
                    rdata = response.data
                }
                if (!isSuccess(rdata)) {
                    const _err = {
                        msg: rdata.msg,
                        errCode: rdata.errCode,
                        type: HTTPERROR[HTTPERROR.LOGICERROR],
                        config: response.config
                    }
                    return Promise.reject(_err)
                }
                return <any>resFormat(rdata)
            },
            (error) => {
                if (TOKENERROR.includes(error.response.status)) {
                    message.destroy()
                    message.error('用户认证失败! 请登录重试...')
                    window.clearTimeout(authTimer)
                    authTimer = window.setTimeout(() => {
                        location.replace('/#/login')
                    }, 300)
                    return
                }
                const _err = {
                    msg: error.response.statusText || error.message || '网络故障',
                    type: /^timeout of/.test(error.message)
                        ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
                        : HTTPERROR[HTTPERROR.NETWORKERROR],
                    config: error.config
                }
                return Promise.reject(_err)
            }
        )
        if (v === 'get') {
            axiosConfig.params = data
        } else if (data instanceof FormData) {
            axiosConfig.data = data
        } else {
            axiosConfig.data = qs.stringify(data)
        }
        axiosConfig.startTime = new Date()
        return instance
            .request(axiosConfig)
            .then(res => res)
            .catch(err => {
                message.destroy()
                message.error(err.response || err.msg || err.stack || '未知错误')
                const url = axiosConfig.url;
                if (url && url.includes('autoScript.set')) {
                    return Promise.resolve({
                        err
                    })
                } else {
                    return Promise.reject({
                        err,
                        stack: err.msg || err.stack || ''
                    })
                }
            })
    }
})

export default http
