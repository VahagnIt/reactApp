import React, {Component} from 'react';

import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './Team.css';
import TeamMembers from "./../../../services/api";
import {withRouter} from 'react-router-dom';


class Team extends Component {

    state ={
        members: [],
    };

    componentDidMount() {
        // Json Server
        TeamMembers.getAllMembers().then( (members) => {
            this.setState({members:members})
        })

        // this.setState({members:TeamMembers.getAllMembers()})
    }

    goProjectPage = (event,id)=>{
        event.preventDefault();

        let url = this.props.location.pathname + "project/" +id;
        this.props.history.push(url);
    }
    render() {

        let teamMembers = this.state.members.map((elem,index)=> {
            return (
                <Col xs='12' md='6' lg="3"  key={index} >
                    <Card>
                        <Card.Img variant="top" src={window.location.origin + elem.img} width="250px" height="180px" />
                        <Card.Body>
                            <Card.Title>{elem.name}</Card.Title>
                            <Card.Title>{elem.profession}</Card.Title>
                            <Card.Text>{elem.info}</Card.Text>
                            <Card.Link href="" onClick={(event)=>this.goProjectPage(event,elem.id)}>See More</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            );
        })
        return (
            <div className="projectBlock">
                <Container>
                    <Row>
                        <div className="titleBlock w-100">
                            <h2>Our Team</h2>
                        </div>
                        <div className="teamBlockMain">
                            {teamMembers}
                        </div>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default withRouter(Team);