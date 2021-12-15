/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

const windowCtlButton = theme => css`
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: ${theme.customTitleBar.ctlHover};
    }
`;

const windowCtlSVG = theme => css`
    fill: ${theme.customTitleBar.color};
`;

module.exports = class CustomTitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isFullScreen: false,
            isMaximize: false
        };
        window.api.onWindowMaximize(() => {
            this.setState({
                isMaximize: true
            });
        });
        window.api.onWindowUnmaximize(() => {
            this.setState({
                isMaximize: false
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
                show: v
            });
        });
    }
    close() {
        window.api.windowClose();
    }
    maximize() {
        window.api.windowMaximize();
    }
    unmaximize() {
        window.api.windowUnmaximize();
    }
    minimize() {
        window.api.windowMinimize();
    }
    render() {
        return (
            this.state.show && !this.state.isFullScreen &&
            <div css={theme => css`
                -webkit-app-region: drag;
                user-select: none;
                height: 36px;
                display: flex;
                background: ${theme.customTitleBar.bg};
            `}>
                <div css={css`
                    -webkit-app-region: no-drag;
                    display: grid;
                    grid-template-columns: 50px 50px 50px;
                    margin-left: auto;
                    height: 36px;
                `}>
                    <div onClick={() => this.minimize()} css={[
                        windowCtlButton,
                        css`
                            grid-column: 1;
                        `
                    ]}>
                        <svg
                            css={windowCtlSVG}
                            width="10"
                            height="1"
                            viewBox="0 0 10 1"
                        >
                            <path d="M10 0v1H0V0z" />
                        </svg>
                    </div>
                    {
                        this.state.isMaximize ?
                            <div onClick={() => this.unmaximize()} css={[
                                windowCtlButton,
                                css`
                                    grid-column: 2;
                                `
                            ]}>
                                <svg
                                    css={windowCtlSVG}
                                    width="11"
                                    height="11"
                                    viewBox="0 0 11 11"
                                >
                                    <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
                                </svg>
                            </div> :
                            <div onClick={() => this.maximize()} css={[
                                windowCtlButton,
                                css`
                                    grid-column: 2;
                                `
                            ]}>
                                <svg
                                    css={windowCtlSVG}
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                >
                                    <path d="M10 0v10H0V0zM9 1H1v8h8z" />
                                </svg>
                            </div>
                    }
                    <div onClick={() => this.close()} css={[
                        windowCtlButton,
                        theme => css`
                            grid-column: 3;
                            &:hover {
                                background: ${theme.customTitleBar.closeHover};
                                & > svg {
                                    fill: ${theme.customTitleBar.closeHoverColor};
                                }
                            }
                        `
                    ]}>
                        <svg
                            css={windowCtlSVG}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                        >
                            <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
};