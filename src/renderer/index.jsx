const React = require('react');
const ReactDOM = require('react-dom');
const { ThemeProvider } = require('@emotion/react');

const theme = require('./themes/light');

const CustomTitleBar = require('./titlebar');

const Settings = require('./pages/settings/index');

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CustomTitleBar />
        <Settings />
    </ThemeProvider>
    ,
    document.getElementById('root')
);