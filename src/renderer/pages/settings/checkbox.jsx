/** @jsx jsx */
const React = require('react');
const { css, jsx } = require('@emotion/react');

module.exports = class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }
    componentDidMount() {
        window.api.getConfig(this.props._key).then(v => {
            this.setState({
                checked: v
            });
        });
    }
    onChange(e) {
        window.api.setConfig(this.props._key, e.target.checked);
        this.setState({
            checked: e.target.checked
        });
    }
    render() {
        return (
            <div css={css`
                border: 1px solid #000;
            `}>
                <input
                    css={css`
                    `}
                    readOnly
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={(e) => this.onChange(e)}
                />
                <span>{this.props.label}</span>
            </div>
        );
    }
};