import React from 'react'
import { Route, Switch } from "react-router";
import {Login, Home, SignUp, SignIn, Rest} from './templates'
import { Auth } from './Auth'

const Router = () => {

  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Rest} />
      <Auth>
        <Route exact path="(/)?" component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router