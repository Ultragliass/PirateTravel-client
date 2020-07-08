import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { registerUserAction } from "./actions/userActions";

const mapDispatchToProps = {
  registerUser: registerUserAction,
};

class _App extends React.Component {
  render() {
    return <div>hi!</div>;
  }

  componentDidMount() {
    const { registerUser }: any = this.props;

    registerUser();
  }
}

const App = connect(undefined, mapDispatchToProps)(_App);

export default App;
