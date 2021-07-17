import React from 'react';

import Header from '../components/header';
// import '../css/conv.css';

const ConvPage = () => {
    return (
        <>
            <Header />
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
        </>
    );
};

export default ConvPage;
