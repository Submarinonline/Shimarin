const React = require('react');
const { ThemeProvider } = require('@emotion/react');

const CustomTitleBar = require('./titlebar');

const Settings = require('./pages/settings/index');

const theme = require('./theme');

module.exports = class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: window.matchMedia('(prefers-color-scheme: light)').matches ? theme.light : theme.dark,
            showTitleBar: false,
            isFullScreen: false
        };
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            this.setState({
                theme: e.matches ? theme.light : theme.dark
            });
        });
        window.api.onEnterFullScreen(() => {
            this.setState({
                isFullScreen: true
            });
        });
        window.api.onLeaveFullScreen(() => {
            this.setState({
                isFullScreen: false
            });
        });
    }
    componentDidMount() {
        window.api.getConfig('customTitleBar').then(v => {
            this.setState({
                showTitleBar: v
            });
        });
    }
    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
                {this.state.showTitleBar && !this.state.isFullScreen && <CustomTitleBar />}
                <Settings />
            </ThemeProvider>
        );
    }
};