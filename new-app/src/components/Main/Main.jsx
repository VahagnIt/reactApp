import React, {Component} from 'react';

import Carousel from './Carousel/CarouselBlock';
import Projects from './Projects/Projects';
import Team from './Team/Team';
import Member from "./Team/Member/Member";
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Main.css';


class Main extends Component {
    render() {
        return (
            <main>
                <Carousel />
                <Projects />
                <Switch>
                    <Route path="/" exact component={Team} />
                    <Route path="/login" exact component={Team} />
                    <Route path="/project/:id" exact component={Member} />
                    {/*<Redirect   to='/404' />*/}
                    {/*<Route path='/404' component={Error} />*/}
                </Switch>
            </main>

        );
    }
}

export default Main;