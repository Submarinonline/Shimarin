/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

const windowCtlButton = css`
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

module.exports = class CustomTitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isFullScreen: false
        };
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
    render() {
        return (
            this.state.show && !this.state.isFullScreen &&
            <div css={css`
                -webkit-app-region: drag;
                user-select: none;
                height: 32px;
                margin-top: 4px;
                display: flex;
            `}>
                <div css={css`
                    -webkit-app-region: no-drag;
                    display: grid;
                    grid-template-columns: 50px 50px 50px;
                    margin-left: auto;
                    position: relative;
                    top: -4px;
                    height: 36px;
                `}>
                    <div css={[
                        windowCtlButton,
                        css`
                            grid-column: 1;
                        `
                    ]}>
                        {/* min */}
                        <svg width="10" height="1" viewBox="0 0 10 1">
                            <path d="M10 0v1H0V0z" />
                        </svg>
                    </div>
                    <div css={[
                        windowCtlButton,
                        css`
                            grid-column: 2;
                        `
                    ]}>
                        {/* max */}
                        <svg width="10" height="10" viewBox="0 0 10 10">
                            <path d="M10 0v10H0V0zM9 1H1v8h8z" />
                        </svg>
                    </div>
                    <div css={[
                        windowCtlButton,
                        css`
                            grid-column: 2;
                        `
                    ]}>
                        {/* unmax */}
                        <svg width="11" height="11" viewBox="0 0 11 11">
                            <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
                        </svg>
                    </div>
                    <div css={[
                        windowCtlButton,
                        css`
                            grid-column: 3;
                        `
                    ]}>
                        {/* close */}
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
};