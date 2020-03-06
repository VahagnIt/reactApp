import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './Login.css';
import Input from './Input/Input';




function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            login: {
                type: 'text',
                value: '',
                touched: false,
                errorMessage: 'Incorrect Login',
                valid: '',
                label: 'Login',
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                type: 'password',
                value: '',
                touched: false,
                errorMessage: 'Incorrect Password',
                valid: '',
                label: 'Password',
                validation: {
                    required: true,
                    minlength: 6,
                },
            },

        },
        role: 0

    }




    changeHandle = (event,type)=>{
        var formControls = { ...this.state.formControls };
        let input = event.target.value;




        if (type == 'login'){
            formControls.login.valid = false;
            if (input != '' && validateEmail(input) && input.trim() !== ''){
                formControls.login.valid = true;
                formControls.login.value = input;
            }
            this.setState({formControls});
            if (formControls.login.valid == true && formControls.password.valid == true){
                this.setState({isFormValid:true});
            }

        }else if(type == 'password'){
            formControls.password.valid = false;
            if (input != '' && input.length >= formControls.password.validation.minlength && input.trim() !== ''){
                formControls.password.valid = true;
                formControls.password.value = input;
            }
            this.setState({formControls});
            if (formControls.login.valid == true && formControls.password.valid == true){
                this.setState({isFormValid:true});
            }
        }else if(type == 'role'){
            let input = event.target.checked;
            if (input){
                this.setState({role:1})
            }
        }
    }




    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName];
            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    label={control.label}
                    onChange={event => {this.changeHandle(event, controlName)}}
                />
            )
        })
    }


    onLogin = ()=>{
            const login = this.state.formControls.login.value;
            const password = this.state.formControls.password.value;
            const role = this.state.role;
            this.props.onLoginHandler(login,password,role);
    }

    onRegister = ()=>{
        const login = this.state.formControls.login.value;
        const password = this.state.formControls.password.value;
        const role = this.state.role;

        this.props.onRegisterHandler(login,password,role);
    }

    render() {


        return (
            <Container>
                <Row>
                    <Form method="post" className="loginForm">
                        { this.renderInputs() }
                        <div>
                            <label htmlFor="admin">Admin</label>
                            <input id="admin" type="checkbox" onChange={event => {this.changeHandle(event, 'role')}}/>
                        </div>

                        <Form.Group controlId="formBasicPassword" style={{marginTop:'25px'}}>
                            <Button variant="primary" type="button" disabled={!this.state.isFormValid} onClick={this.onLogin}>
                                Login
                            </Button>
                            <Button variant="primary" type="button" style={{marginLeft: '25px'}} disabled={!this.state.isFormValid} onClick={this.onRegister}>
                                Register
                            </Button>
                        </Form.Group>

                    </Form>
                </Row>
            </Container>
        );
    }
}



export default Login;