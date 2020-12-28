import React, { useState } from 'react';
import {HashRouter as HRouter, Route, Switch} from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";

const Router = ({isLoggedIn}) => {

    return (
        <HRouter>
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/"><Home/></Route>
                    </> :
                    <Route exact path="/"><Auth /></Route>}
            </Switch>
        </HRouter>
    );
};

export default Router;