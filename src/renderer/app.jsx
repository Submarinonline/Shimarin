/** @jsx jsx */
const React = require('react');
const { ThemeProvider, css, jsx } = require('@emotion/react');

const TitleBar = require('./titlebar');
const SideBar = require('./sidebar');

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
                <div css={css`
                    height: 100%;
                    overflow: hidden;
                `}>
                    {this.state.showTitleBar && !this.state.isFullScreen && <TitleBar />}
                    <div css={css`
                        height: ${this.state.showTitleBar && !this.state.isFullScreen ? 'calc(100% - 36px)' : '100%'};
                        display: inline-block;
                    `}>
                        <SideBar />
                    </div>
                    <div css={css`
                        height: ${this.state.showTitleBar && !this.state.isFullScreen ? 'calc(100% - 36px)' : '100%'};
                        width: calc(100% - 80px);
                        display: inline-block;
                        overflow: auto;
                    `}>
                        <Settings />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
};