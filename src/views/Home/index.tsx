import * as React from 'react'
import { Layout } from 'antd'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import { hot } from 'react-hot-loader'

import * as styles from './index.module.scss'
import Error from '@components/Error'
import menu, { asynchronousComponents } from '@models/menu'
import Header from '@views/__parts__/Header'
import Sider from '@views/__parts__/Sider'

function Home() {
    return (
        <Layout>
            <Sider />
            <Layout>
                <Header />
                <Layout.Content className={styles.content}>
                    <Router>
                        <Switch>
                            {menu.map(m => {
                                if (!m.path) {
                                    return null
                                }
                                return (
                                    <Route
                                        key={m.id}
                                        exact={m.exact}
                                        path={m.path}
                                        component={m.component ? asynchronousComponents[m.component] : asynchronousComponents['Dashboard']}
                                    />
                                )
                            })}
                            <Route component={Error} />
                        </Switch>
                    </Router>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

// export default hot(module)(Home)
export default Home
