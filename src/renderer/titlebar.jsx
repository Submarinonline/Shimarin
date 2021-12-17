/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

const windowCtlButton = theme => css`
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: ${theme.titleBar.ctlHover};
    }
    & > svg {
        fill: ${theme.titleBar.color};
    }
`;

const MinimizeBtn = () => {
    return (
        <div onClick={window.api.windowMinimize} css={[
            windowCtlButton,
            css`
                grid-column: 1;
            `
        ]}>
            <svg
                width="10"
                height="1"
                viewBox="0 0 10 1"
            >
                <path d="M10 0v1H0V0z" />
            </svg>
        </div>
    );
};

const UnmaximizeBtn = () => {
    return (
        <div onClick={window.api.windowUnmaximize} css={[
            windowCtlButton,
            css`
                grid-column: 2;
            `
        ]}>
            <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
            >
                <path d="M11 9H9v2H0V2h2V0h9zM8 3H1v7h7zm2-2H3v1h6v6h1z" />
            </svg>
        </div>
    );
};

const MaximizeBtn = () => {
    return (
        <div onClick={window.api.windowMaximize} css={[
            windowCtlButton,
            css`
                grid-column: 2;
            `
        ]}>
            <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
            >
                <path d="M10 0v10H0V0zM9 1H1v8h8z" />
            </svg>
        </div>
    );
};

const CloseBtn = () => {
    return (
        <div onClick={window.api.windowClose} css={[
            windowCtlButton,
            theme => css`
                grid-column: 3;
                &:hover {
                    background: ${theme.titleBar.closeHover};
                    & > svg {
                        fill: ${theme.titleBar.closeHoverColor};
                    }
                }
            `
        ]}>
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
            >
                <path d="M7 6l5 5-1 1-5-5-5 5-1-1 5-5-5-5 1-1 5 5 5-5 1 1z" />
            </svg>
        </div>
    );
};

class WindowCtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }
    render() {
        return (
            <div css={css`
                -webkit-app-region: no-drag;
                display: grid;
                grid-template-columns: 50px 50px 50px;
                margin-left: auto;
                height: 36px;
            `}>
                <MinimizeBtn />
                {this.state.isMaximize ? <UnmaximizeBtn /> : <MaximizeBtn />}
                <CloseBtn />
            </div>
        );
    }
}

module.exports = class TitleBar extends React.Component {
    render() {
        return (
            <div css={theme => css`
                -webkit-app-region: drag;
                user-select: none;
                height: 36px;
                display: flex;
                background: ${theme.titleBar.bg};
            `}>
                <WindowCtl />
            </div>
        );
    }
};