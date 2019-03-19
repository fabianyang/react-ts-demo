export as namespace IModules

export interface User {
    _id?: string
    account: string
    password?: string
    category?: string
    createdAt?: string
}

export interface UserInfo {
    msg: string
    token: string
    category: string
}