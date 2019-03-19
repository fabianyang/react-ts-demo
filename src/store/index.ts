import { RouterStore } from 'mobx-react-router'

export const routerStore = new RouterStore()

export { default as globalStore } from './global'

export { default as authStore } from './auth'

export { default as userStore } from './user'
