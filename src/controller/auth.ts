import http from '@services/http'

export default {
    // 登录
    login(data: object): Promise<any> {
        return http.post('auth/login', data || {})
    }
}
