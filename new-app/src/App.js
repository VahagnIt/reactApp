import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

// components
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import EditProjects from "./components/EditProjects/EditProjects";
import Member from "./components/Main/Team/Member/Member";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Burger from "./components/Burger/Burger";



export const NameContext  = React.createContext(null);

class App extends Component{

    state = {
        isLogined: window.localStorage.getItem('user'),
        userRole: 0,
        name: 'Vahag'
    };


    onLoginHandler = (login,password)=>{
        var self = this;
        axios.get('http://localhost:3001/users')
            .then(function (response) {
                // handle success
                response.data.forEach((elem)=>{
                   if(elem.login === login && elem.password === password){
                       // console.log(elem.role);
                       self.setState({isLogined:true});
                       self.setState({userRole:elem.role});
                       window.localStorage.setItem('user',elem.id);
                   }
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    onLogout = ()=>{
        window.localStorage.removeItem('user');
        this.setState({isLogined:window.localStorage.getItem('user')})
    }

    onRegisterHandler = (login,password,role)=>{
        var self = this;

        axios.post('http://localhost:3001/users',{
            login: login,
            password: password,
            role: role,
        })
            .then(function (response) {
                self.setState({isLogined:true});
                window.localStorage.setItem('user',response.data.id);

            })
    }

    render() {
        let role = this.state.userRole;
        console.log(role);

        if(!this.state.isLogined) {
            return(
               <Login onLoginHandler={this.onLoginHandler} onRegisterHandler={this.onRegisterHandler}/>
            )
        }
        return (
                <div className="App">
                    <Header userRole={role} onLogout={this.onLogout} isLogined={this.isLogined}/>

                    <Switch>

                        {/*<Route path="/project/:id" exact component={Main} />*/}
                        <Route path="/edit-projects" exact component={EditProjects} />
                        <Route path="/images" exact component={ImageUpload}/>
                        <Route path="/burger" exact component={Burger} />
                        <Route path="/"   render={() =>{
                            return(
                                <NameContext.Provider value={this.state.name}>
                                    <Main />
                                </NameContext.Provider>
                            )}
                        } />
                        {/*<Route path="/features" exact component={Footer} />*/}
                        {/*<Redirect   to='/404' />*/}
                        {/*<Route path='/404' component={Error} />*/}
                    </Switch>
                    {/*<Main />*/}

                    <Footer />
                </div>
        );
    }

}

export default App;

