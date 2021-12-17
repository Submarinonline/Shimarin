/** @jsx jsx */
const React = require('react');
const { ThemeProvider, css, jsx } = require('@emotion/react');

const TitleBar = require('./titlebar');
const SideBar = require('./sidebar');
const Content = require('./content');

const theme = require('./theme');

module.exports = class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: window.matchMedia('(prefers-color-scheme: light)').matches ? theme.light : theme.dark,
            showTitleBar: false,
            isFullScreen: false
        };
        window.api.setBackgroundColor(this.state.theme.bg);
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            this.setState({
                theme: e.matches ? theme.light : theme.dark
            }, () => window.api.setBackgroundColor(this.state.theme.bg));
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
                {this.state.showTitleBar && !this.state.isFullScreen && <TitleBar />}
                <div css={css`
                    height: ${this.state.showTitleBar && !this.state.isFullScreen ? 'calc(100% - 36px)' : '100%'};
                `}>
                    <SideBar />
                    <Content />
                </div>
            </ThemeProvider>
        );
    }
};