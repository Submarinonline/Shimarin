/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class KeyConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            inputLabel: '追加'
        };
    }
    componentDidMount() {
        window.api.getConfig(this.props._key).then(v => {
            this.setState({
                items: [...this.state.items, ...v]
            });
        });
    }
    removeKeyBind(val) {
        const arr = this.state.items.filter(v => v !== val);
        window.api.setConfig(this.props._key, arr);
        this.setState({
            items: arr
        });
    }
    onKeyUp(e) {
        const res = [];
        let key;
        if (/CONTROL|SHIFT|ALT/i.test(e.key)) return;
        if (e.ctrlKey) res.push('Control');
        if (e.shiftKey) res.push('Shift');
        if (e.altKey) res.push('Alt');
        // ここに矢印キーとかを追加
        //console.log(e.key);
        if (/^[A-Z]$/i.test(e.key)) { key = e.key.toUpperCase(); }
        if (/^[0-9]$/i.test(e.key)) { key = e.key; }

        if (!key) return;
        res.push(key);
        const str = res.join('+');

        const arr = this.state.items;
        if (arr.includes(str)) return e.target.blur();
        arr.push(str);
        window.api.setConfig(this.props._key, arr);
        this.setState({
            items: arr,
            inputLabel: '追加'
        });

        e.target.blur();
    }
    onFocus() {
        window.api.disableShortcuts();
        this.setState({
            inputLabel: '...'
        });
    }
    onBlur() {
        window.api.enableShortcuts();
        this.setState({
            inputLabel: '追加'
        });
    }
    render() {
        const items = [];
        this.state.items.forEach(value => {
            items.push(
                <div key={value}>
                    <span>{value}</span>
                    <button onClick={() => this.removeKeyBind(value)}>削除</button>
                </div>
            );
        });

        return (
            <div css={css`
                border: 1px solid #000;
            `}>
                <span>{this.props.label}</span>
                <input
                    css={css`
                        text-align: center;
                        padding: 0;
                        width: 40px;
                        &:focus {
                            outline: none;
                        }
                    `}
                    readOnly
                    value={this.state.inputLabel}
                    onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                    onKeyUp={(e) => this.onKeyUp(e)}
                />
                {items}
            </div>
        );
    }
};