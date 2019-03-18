import './index.module.scss';

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import createHashHistory from 'history/createHashHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import AppRouter from '@routers/App'
import * as store from './store'

configure({ enforceActions: 'observed' })

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

const render = (Component: any) => {
    ReactDOM.render(
        <Provider {...store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('root') as HTMLElement
    )
}

render(AppRouter)



// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './routers/index';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
