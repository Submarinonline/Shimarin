/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');
const cjp = require('cjp');
const mhr = require('genhera');

const button = theme => css`
    color: ${theme.button.color1};
    padding: 0px;
    height: 30px;
    width: calc(25% - 10px);
    border-radius: 10px;
    border: none;
    background: ${theme.button.bg1};
    margin-left: 5px;
    margin-right: 5px;
    &:focus {
        outline: none;
        background: ${theme.button.hover1};
    }
    &:hover {
        background: ${theme.button.hover1};
    }
`;

const textarea = theme => css`
    font-size: 25px;
    margin: 5px;
    padding: 5px;
    width: calc(50% - 10px);
    height: calc(100% - 20px);
    border-radius: 10px;
    background: ${theme.textarea.bg1};
    color: ${theme.textarea.color1};
    overflow: hidden;
    resize: none;
    &:focus {
        outline: none;
    }
`;

module.exports = class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.gen = this.gen.bind(this);
        this.onChange = this.onChange.bind(this);
        this.input = this.input.bind(this);
        this.output = this.output.bind(this);
        this.clear = this.clear.bind(this);
        this.copy = this.copy.bind(this);
        this.state = {
            input: '',
            output: '',
            mode: 'cjp'
        };
    }
    gen() {
        const mode = this.state.mode;
        const str = this.state.input;
        let res;
        switch (mode) {
            case 'cjp': {
                res = cjp.generate(str);
                break;
            }
            case 'mhr': {
                res = mhr.generate(str);
                break;
            }
        }
        this.setState({
            output: res
        });
    }
    onChange(e) {
        this.setState({
            mode: e.target.value
        }, () => this.gen());
    }
    input(e) {
        this.setState({
            input: e.target.value
        }, () => this.gen());
    }
    output(e) {
        this.setState({
            output: e.target.value
        });
    }
    clear() {
        this.setState({
            input: '',
            output: ''
        });
    }
    copy() {
        navigator.clipboard.writeText(this.state.output);
    }
    render() {
        return (
            <>
                <div css={css`
                    display: flex;
                `}>
                    <select css={theme => css`
                        color: ${theme.select.color1};
                        width: calc(50% - 10px);
                        height: 30px;
                        border-radius: 10px;
                        background: ${theme.select.bg1};
                        margin-left: 5px;
                        margin-right: 5px;
                        &:focus {
                            outline: none;
                        }
                    `} onChange={this.onChange}>
                        <option value='cjp'>怪しい日本語</option>
                        <option value='mhr'>メンヘラ</option>
                    </select>
                    <button css={button} onClick={this.copy}>コピー</button>
                    <button css={button} onClick={this.clear}>クリア</button>
                </div>
                <div css={css`
                    display: flex;
                    height: calc(100% - 30px);
                `}>
                    <textarea css={textarea} onInput={this.input} value={this.state.input} spellCheck="false" placeholder="ここに入力"></textarea>
                    <textarea css={textarea} onInput={this.output} value={this.state.output} spellCheck="false" placeholder="ここに出力"></textarea>
                </div>
            </>
        );
    }
};