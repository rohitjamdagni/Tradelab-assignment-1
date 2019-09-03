import React from "react";
//import logo from "./logo.svg";
//import "./App.css";
import Dashboard from "./Dashboard";
import Store from "./Store";
import LoginForm from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    // the initial application state
    this.state = {
      user: null
    };
  }
  signOut() {
    this.setState({
      user: null
    });
  }
  signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    this.setState({
      user: {
        username,
        password
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Store>
          {this.state.user === null ? (
            <LoginForm onSignIn={this.signIn.bind(this)} />
          ) : (
            <Dashboard
              onSignOut={this.signOut.bind(this)}
              username={this.state.user.username}
            />
          )}
        </Store>
      </div>
    );
  }
}

export default App;
