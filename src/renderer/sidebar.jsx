/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class SideBar extends React.Component {
    render() {
        return (
            <div css={css`
                height: 100%;
                width: 80px;
                background: skyblue;
            `}>

            </div>
        );
    }
};