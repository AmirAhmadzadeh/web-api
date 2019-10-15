
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Academy from '../containers/Academy/Academy';
import Home from '../containers/Home/Home' ;  
import Auth from '../containers/Auth/Auth';
import Panel from '../containers/Panel/Panel';


export default function(){
    return (
        <Switch>
            <Route path='/amir-admin'  />
            <Route path="/courses" component={Academy} />
            <Route path="/auth" component={Auth} />
            <Route path="/panel" component={Panel} />
            <Route path="/" exact component={Home} />
        </Switch>
    );
}
