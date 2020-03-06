import React, {Component} from 'react';

import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './FooterMenu.css';

class FooterMenu extends Component {
    render() {
        return (
            <div className="footerMenu">
                <Container>
                    <Row>
                        <Col xs sm="3">
                            <ul>
                                <li><h5>Features</h5></li>
                                <li>Home</li>
                                <li>Subject</li>
                                <li>Courses</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                        <Col xs sm="3">
                            <ul>
                                <li><h5>Features</h5></li>
                                <li>Home</li>
                                <li>Subject</li>
                                <li>Courses</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                        <Col xs sm="3">
                            <ul>
                                <li><h5>Features</h5></li>
                                <li>Home</li>
                                <li>Subject</li>
                                <li>Courses</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                        <Col xs sm="3">
                            <ul>
                                <li><h5>Features</h5></li>
                                <li>Home</li>
                                <li>Subject</li>
                                <li>Courses</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default FooterMenu;