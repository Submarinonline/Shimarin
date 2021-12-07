/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

const KeyConfig = require('./keyconfig');

module.exports = class Settings extends React.Component {
    render() {
        return (
            <>
                <KeyConfig label='終了' _key='keyBind.quit' />
                <KeyConfig label='リロード' _key='keyBind.reload' />
            </>
        );
    }
};