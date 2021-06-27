
import './app.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import {
  AppBar,
  Button,
  Toolbar,
} from '@material-ui/core';

import { XStateTest } from './x-state-test/x-state-test';
import { ThemePalette } from './theme-palette/theme-palette';

interface AppProps {

}

export function App(props: AppProps) {
  const history = useHistory();
  return (
    <Router>
      <div className="app-main">
        <AppBar position="static">
          <Toolbar>
            <div className="app-toolbar">
              <div className="app-bar-text">
                XState Test App
              </div>
              <div className="page-nav">
                <div className="page-nav-button">
                  <Link to="/">
                    <Button color="primary">
                      Home
                    </Button>
                  </Link>
                </div>
                <div className="page-nav-button">
                  <Link to="/theme-palette">
                    <Button color="primary">
                      Theme
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            exact
            path="/">
            <XStateTest/>
          </Route>
          <Route path="/theme-palette">
            <ThemePalette/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
