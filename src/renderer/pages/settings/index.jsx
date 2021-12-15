/** @jsx jsx */
const React = require('react');
// eslint-disable-next-line no-unused-vars
const { css, jsx } = require('@emotion/react');

const CheckBox = require('./checkbox');
const KeyConfig = require('./keyconfig');

module.exports = class Settings extends React.Component {
    render() {
        return (
            <>
                <CheckBox label='カスタムタイトルバー' _key='customTitleBar' />
                <KeyConfig label='アプリの終了' _key='keyBind.quit' />
                <KeyConfig label='再読み込み' _key='keyBind.reload' />
                <KeyConfig label='フルスクリーン切り替え' _key='keyBind.fullscreen' />
                <KeyConfig label='DevToolsを開く' _key='keyBind.devtools' />
            </>
        );
    }
};