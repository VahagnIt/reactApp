import React, {Component} from 'react';


class Input extends Component {
    render() {

        const htmlFor = this.props.type+'-'+Math.random();
        let checkValidation = this.props.valid == true || this.props.valid === '';

        return (
            <div>
                <label htmlFor={htmlFor}>{this.props.label}</label>
                <input id={htmlFor} type={this.props.type} className={`form-control ${checkValidation ? '' : 'colorDanger'}`} onChange={this.props.onChange}/>
                <span style={{color:'red'}}>{checkValidation ? null : this.props.errorMessage}</span>
            </div>
        );
    }
}

export default Input;