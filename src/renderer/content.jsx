/** @jsx jsx */
const React = require('react');
const { Routes, Route } = require('react-router-dom');
const { css, jsx } = require('@emotion/react');

const Generator = require('./pages/generator/index');
const Settings = require('./pages/settings/index');

module.exports = class Content extends React.Component {
    render() {
        return (
            <div css={css`
                display: inline-block;
                height: 100%;
                width: calc(100% - 70px);
                overflow: auto;
            `}>
                <Routes>
                    <Route path='/' element={<div>hi</div>} />
                    <Route path='/generator' element={<Generator />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        );
    }
};