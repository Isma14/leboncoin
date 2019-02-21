import React, { Component } from "react";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";

class App extends Component {
  state = {
    userId: Cookies.get("userId") || null,
    userEmail: Cookies.get("userEmail") || null,
    token: Cookies.get("userToken") || null
  };
  setUser = user => {
    this.setState({
      userId: user.id,
      userEmail: user.email,
      token: user.token
    });
    console.log("userToken", user);
    Cookies.set("userId", user.id);
    Cookies.set("userEmail", user.email);
    Cookies.set("userToken", user.token);
  };

  renderNavigation = () => {
    if (this.state.token) {
      return (
        <>
          <span>{this.state.userEmail}</span>
          <button
            onClick={() => {
              Cookies.remove("userId");
              Cookies.remove("userEmail");
              Cookies.remove("userToken");

              window.location.reload();
            }}
          >
            Se deconnecter
          </button>
        </>
      );
    } else {
      return <Header />;
    }
  };
  render() {
    return (
      <BrowserRouter>
        <>
          {this.renderNavigation()}
          <Switch>
            <Route
              exact={true}
              path="/"
              render={props => <Home {...props} />}
            />
            <Route
              path="/offer/:offerId"
              render={props => <Offer {...props} />}
            />
            <Route
              // exact={true}
              path="/sign_up"
              render={props => <SignUp setUserId={this.setUserId} {...props} />}
            />
            <Route
              path="/log_in"
              render={props => <LogIn {...props} setUser={this.setUser} />}
            />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
