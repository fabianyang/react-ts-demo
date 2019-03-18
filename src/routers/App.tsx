import * as React from 'react'
// import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import * as styles from './App.module.scss'
import PageLoading from '@components/PageLoading'
import Error from '@components/Error'
import PrivateRoute from './PrivateRoute'

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '@views/Home'),
    loading: PageLoading
})
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ '@views/Login'),
    loading: PageLoading
})

// yangfanyf.yang: https://medium.com/@ethan_ikt/react-stateless-functional-component-with-typescript-ce5043466011
const AppWrapper: React.SFC = props => <div className={styles.appWrapper}>{props.children}</div>

class AppRouter extends React.Component<{}> {
    render() {
        return (
            <AppWrapper>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/" component={Home} />
                        <Route component={Error} />
                    </Switch>
                </Router>
            </AppWrapper>
        )
    }
}

// export default hot(module)(AppRouter)
export default AppRouter
