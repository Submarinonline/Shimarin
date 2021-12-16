/** @jsx jsx */
const React = require('react');
const { Link } = require('react-router-dom');
const { css, jsx } = require('@emotion/react');

module.exports = class SideBar extends React.Component {
    render() {
        return (
            <div css={css`
                display: inline-block;
                height: 100%;
                width: 80px;
                overflow: auto;
                background: skyblue;
            `}>
                <Link to='/'>aaa</Link>
                <Link to='/settings'>s</Link>
            </div>
        );
    }
};