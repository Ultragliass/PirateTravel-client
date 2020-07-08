import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleReturningUserAction } from "./actions/userActions";

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
};

class _App extends React.Component {
  render() {
    return <div>hi!</div>;
  }

  componentDidMount() {
    const { handleReturningUser }: any = this.props;

    handleReturningUser()
  }
}

const App = connect(undefined, mapDispatchToProps)(_App);

export default App;
