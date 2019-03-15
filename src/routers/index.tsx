/**
 * @module 路由
 */

import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from '../App';
import { Button } from 'antd';
import TimerView from '../TimeView';
import AppState from '../TimeCounter';



// function Index() {
//   return <h2>Home</h2>;
// }

function About(): ReactElement {
    return <Button type="primary">Button</Button>
}

function Users(): ReactElement {
    const appState = new AppState();
    return <TimerView appState={appState} />
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;