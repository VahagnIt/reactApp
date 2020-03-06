import React, {Component} from 'react';

import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import logo from './../../../logo.svg';
import './FooterSocials.css'
class FooterSocials extends Component {
    render() {
        return (
            <div className="footerSocials">
                <Container>
                    <Row>
                        <Col sm="12" md="2">
                            <div className="img-block">
                                <img src={logo} alt=""/>
                            </div>
                        </Col>
                        <Col sm="12" md="10">
                            <div className='socials'>
                                <div>
                                    <span><a href="" target="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i></a></span>
                                    <span><a href="" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></span>
                                    <span><a href="" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a></span>
                                    <span><a href="" target="_blank"><i className="fa fa-google-plus-square" aria-hidden="true"></i></a></span>
                                </div>
                                <div>
                                    <p>© Copyright 2011 John Doe All Rights Reserved</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FooterSocials;