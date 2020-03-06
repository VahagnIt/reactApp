import React, {Component} from 'react';

import './Header.css';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import logo from './../../logo.svg';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Footer from "../Footer/Footer";
import EditProjects from "../EditProjects/EditProjects";
import ImageUpload from "./../ImageUpload/ImageUpload";
import Burger from "../Burger/Burger";

class Header extends Component {



    logout = (e)=>{
        e.preventDefault();
        this.props.onLogout();
    }



    render() {



        return (
            <header>
                <Container>
                    <Row>
                        {/*<span><img src={logo} alt=""/></span>*/}
                        <Navbar bg="dark" variant="dark" className='w-100' expand="md">
                            <Navbar.Brand href="#home"><img src={logo} alt="" width="40px"/></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="justify-content-end w-100" >
                                    <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>

                                    {/*{*/}
                                        {/*this.props.userRole == 1 ?*/}
                                            {/*<NavLink to="/edit-projects" exact className="nav-link">Edit Projects</NavLink> :*/}
                                            {/*''*/}
                                    {/*}*/}
                                    <NavLink to="/edit-projects" exact className="nav-link">Edit Projects</NavLink>
                                    <NavLink to="/images" exact className="nav-link">Image Upload</NavLink>
                                    <NavLink to="/burger" exact className="nav-link">Burger</NavLink>

                                    <NavLink to="/login" exact className="nav-link">Login</NavLink>
                                    <Nav.Link href="#" onClick={(e)=>{this.logout(e)}}>LogOut</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <Switch>
                            <Route path="/" exact />
                            {/*<Route path="/image" exact component={ImageUpload}/>*/}
                            {/*<Route path="/edit-projects" exact component={EditProjects} />*/}
                            {/*<Route path="/features" exact component={Footer} />*/}
                            {/*<Route path="/project/:id" exact component={Member} />*/}
                            {/*<Redirect   to='/404' />*/}
                            {/*<Route path='/404' component={Error} />*/}
                        </Switch>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;