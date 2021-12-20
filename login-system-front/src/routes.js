import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { isAuthenticated } from "./services/auth";

import Login from "./pages/login";
import SignUp from "./pages/signUp";
import UserDash from './pages/userDash';
import EditInfo from "./pages/editInfo";

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
            <PrivateRoute path="/userDash" component={UserDash} />
            <PrivateRoute exact path="/edit" component={EditInfo} />
            <Route path="*" component={() => <h1>Página não encontrada (erro 404)</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;