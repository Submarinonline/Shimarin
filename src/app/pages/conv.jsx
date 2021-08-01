import React from 'react';

import Layout from '../components/layout';
// import '../css/conv.css';

const ConvPage = () => {
    return (
        <Layout pageId="conv">
            <div id="header">
                <select id="select">
                    <option value='cjp'>怪しい日本語</option>
                    <option value='mhr'>メンヘラ</option>
                </select>
                <button id="copy">コピー</button>
                <button id="clear">クリア</button>
            </div>
            <div id="textarea">
                <textarea id="input" spellCheck="false" placeholder="ここに入力"></textarea>
                <textarea id="output" spellCheck="false" placeholder="ここに出力"></textarea>
            </div>
        </Layout>
    );
};

export default ConvPage;
