import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3100/sign_up", {
      email: this.state.email,
      password: this.state.password
    });
    if (response.data.token) {
      console.log("Redirecting");
      this.props.history.push("/");
      this.props.setUser(response.data);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    );
  }
}
export default SignUp;
