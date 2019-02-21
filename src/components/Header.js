import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <h1 className="webname">Le Bon Coin</h1>

        <Link to="/sign_up">Creer un compte</Link>
        <Link to="/log_in">"Se Connecter</Link>
      </div>
    );
  }
}
export default Header;
