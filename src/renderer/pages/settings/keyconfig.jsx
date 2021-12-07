/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class KeyConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            inputVal: ''
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
    addKeyBind() {
        const arr = this.state.items;
        arr.push(this.state.inputVal);
        window.api.setConfig(this.props._key, arr);
        this.setState({
            items: arr,
            inputVal: ''
        });
    }
    keyUp(e) {
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
        this.setState({
            inputVal: res.join('+')
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
                    readOnly
                    value={this.state.inputVal}
                    onBlur={window.api.enableShortcuts}
                    onFocus={window.api.disableShortcuts}
                    onKeyUp={(e) => this.keyUp(e)}
                />
                <button onClick={() => this.addKeyBind()}>追加</button>
                {items}
            </div>
        );
    }
};