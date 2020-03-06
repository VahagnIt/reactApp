import React, {Component} from 'react';

import './Projects.css';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import projectsData from './../../../services/projectData';

class Projects extends Component {

    state = {
        projects: []
    }

    componentDidMount() {
        // this.setState({projects:projectsData.getAllProjects()})

        // Json Server
        projectsData.getAllProjects().then((projects)=>{
            this.setState({projects})
        })
    }


    render() {
        let projects = this.state.projects.map((elem,index)=>{
            return (
                <Col xs='12' sm='6' md="4" key={index}>
                    <Card>
                        <span className="shareIcon"><i className={elem.icon} aria-hidden="true"></i></span>
                        <Card.Body>
                            <Card.Title>{elem.title}</Card.Title>
                            <Card.Text>{elem.info}</Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });

        return (
            <div className="projectBlock">
                <Container>
                    <Row>
                        <div className="titleBlock w-100">
                            <h2>Our Projects</h2>
                        </div>
                        {projects}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Projects;