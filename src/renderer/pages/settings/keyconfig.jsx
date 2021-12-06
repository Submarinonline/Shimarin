/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class KeyConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
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
        this.setState({
            items: arr
        });
        window.api.setConfig(this.props._key, arr);
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
                <span>{this.props.title}</span>
                {items}
            </div>
        );
    }
};