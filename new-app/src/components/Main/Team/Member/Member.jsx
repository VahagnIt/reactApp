import React, {Component} from 'react';
import TeamMembers from "./../../../../services/api";
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './Member.css';
import {NameContext} from "../../../../App";

class Member extends Component {
    state = {
        member: []
    };
    componentDidMount() {
        // if (TeamMembers.getCurrentMember(this.props.match.params.id)){
        //     let member = TeamMembers.getCurrentMember(this.props.match.params.id);
        //     this.setState({member:member}, ()=>{console.log(member)});
        // }else{
        //     this.props.history.push('/404');
        // }


        // Json Server
        TeamMembers.getCurrentMember(this.props.match.params.id).then((member)=>{
            if (member) {
                this.setState({member:member});
            }else{
                this.props.history.push('/404');
            }
        });
    }

    goBack = () =>{
        this.props.history.goBack()
    }

    render() {
        return (
            <Container>
                <Row>
                   <div className='memberDetail'>
                       <Col xs sm="5"  className='block1'>
                           <div className="img-block">
                               <img src={window.location.origin + this.state.member.img} alt="" width="250px" height="200px"/>
                           </div>
                       </Col>
                       <Col xs sm="7" className='block2'>
                           <NameContext.Consumer>
                           {
                               (value)=> {return <h1>{value}</h1>}
                           }
                           </NameContext.Consumer>

                           <h1>{this.state.member.name}</h1>
                           <h2>{this.state.member.profession}</h2>
                           <h4>{this.state.member.info}</h4>
                           <button className="btn btn-primary" onClick={()=>this.goBack()}>Go Back</button>
                       </Col>
                   </div>
                </Row>
            </Container>
        );
    }
}

export default Member;