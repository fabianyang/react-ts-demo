import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { setCookie, clearCookie } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/index'

export class AuthStore extends StoreExt {
    /**
     * 用户信息
     *
     * @type {IAuthStore.UserInfo}
     * @memberof AuthStore
     */
    @observable
    userInfo: IModules.UserInfo = {
        msg: '',
        token: '',
        category: '',
    }

    @action
    login = async (params: IRequestParams.Login): Promise<any> => {
        try {
            const res = await this.api.auth.login(params)
            runInAction('SET_USERINFO', () => {
                this.userInfo = res
            })
            setCookie(COOKIE_KEYS.TOKEN, res.token)
            localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(res))
            routerStore.replace('/')
        } catch (err) {
            console.error(err)
        }
    }

    @action
    logout = () => {
        clearCookie(COOKIE_KEYS.TOKEN)
        localStorage.removeItem(LOCALSTORAGE_KEYS.USERINFO)
        routerStore.replace('/login')
    }

    /**
     * 初始化用户信息
     *
     * @memberof AuthStore
     */
    @action
    initUserInfo = (): IModules.UserInfo => {
        const lcoalUserInfo = localStorage.getItem(LOCALSTORAGE_KEYS.USERINFO)
        if (!lcoalUserInfo) {
            throw new Error('no local userinfo!!')
        }
        const userInfo: IModules.UserInfo = JSON.parse(lcoalUserInfo)
        this.userInfo = userInfo
        return userInfo
    }
}

export default new AuthStore()
