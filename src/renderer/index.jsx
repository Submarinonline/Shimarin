const React = require('react');
const ReactDOM = require('react-dom');

const CustomTitleBar = require('./titlebar');

const Settings = require('./pages/settings/index');

ReactDOM.render(
    <>
        <CustomTitleBar />
        <Settings />
    </>
    ,
    document.getElementById('root')
);