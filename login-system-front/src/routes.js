import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import Login from "./pages/login";
import SignUp from "./pages/signUp";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render = { props =>
        isAuthenticated() ? (
        <Component {...props} />
        ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
        )
      }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
        </Switch>
    </BrowserRouter>
);

export default Routes;