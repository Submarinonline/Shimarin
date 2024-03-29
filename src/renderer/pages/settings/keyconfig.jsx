/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class KeyConfig extends React.Component {
    constructor(props) {
        super(props);
        this.removeKeyBind = this.removeKeyBind.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
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
    removeKeyBind(e) {
        const accelerator = e.target.dataset.accelerator;
        const arr = this.state.items.filter(a => a !== accelerator);
        window.api.setConfig(this.props._key, arr);
        window.api.unregisterShortcut(accelerator, this.props._key);
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
        // ここに矢印キーとかを追加(https://www.electronjs.org/docs/latest/api/accelerator)
        //console.log(e.key);
        //if (/^[A-Z]$/i.test(e.key)) { key = e.key.toUpperCase(); }
        //if (/^[0-9]$/i.test(e.key)) { key = e.key; }

        if (!key) key = e.key.toUpperCase();

        res.push(key);

        const accelerator = res.join('+');

        const arr = this.state.items;
        if (arr.includes(accelerator)) return e.target.blur();
        arr.push(accelerator);

        window.api.setConfig(this.props._key, arr);
        window.api.registerShortcut(accelerator, this.props._key);
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
        this.state.items.forEach(accelerator => {
            items.push(
                <div key={accelerator}>
                    <span>{accelerator}</span>
                    <button data-accelerator={accelerator} onClick={this.removeKeyBind}>削除</button>
                </div>
            );
        });

        return (
            <div css={css`
                border: 1px solid #000;
            `}>
                <span>{this.props.label}</span>
                <span
                    css={css`
                    `}
                    tabIndex='-1'
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onKeyUp={this.onKeyUp}
                >{this.state.inputLabel}</span>
                {items}
            </div>
        );
    }
};