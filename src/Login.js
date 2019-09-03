import React from "react";
import "./login.css";

class LoginForm extends React.Component {
  // Using a class based component here because we're accessing DOM refs

  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  render() {
    return (
      <div class="ui-view">
        <div class="login-view">
          <div class="login-form">
            <form class="form" onSubmit={this.handleSignIn.bind(this)}>
              <div class="input-box-holder" placeholder="ID">
                <input type="text" ref="username" />
              </div>
              <div class="input-box-holder">
                <input type="password" placeholder="password" ref="password" />
              </div>
              <div class="input-box-holder">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
