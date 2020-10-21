import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import Login from './pages/login';
import SingUp from './pages/signup';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SingUp}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default App;