import React from 'react';
import {HashRouter as HRouter, Route, Redirect, Switch} from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const Router = ({isLoggedIn, userObj}) => {

    return (
        <HRouter>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/"><Home userObj={userObj}/></Route>
                        <Route exact path="/profile"><Profile/></Route>
                        <Redirect from="*" to="/"/>
                    </> :
                    <>
                        <Route exact path="/"><Auth/></Route>
                        <Redirect from="*" to="/"/>
                    </>
                }
            </Switch>
        </HRouter>
    );
};

export default Router;