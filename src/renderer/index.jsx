const React = require('react');
const ReactDOM = require('react-dom');
const { HashRouter } = require('react-router-dom');

const App = require('./app');

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    ,
    document.getElementById('root')
);