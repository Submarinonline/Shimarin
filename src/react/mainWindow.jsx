import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import IndexPage from './pages/index';
import ConvPage from './pages/conv';
import SettingsPage from './pages/settings';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/conv" component={ConvPage} />
            <Route path="/settings" component={SettingsPage} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
