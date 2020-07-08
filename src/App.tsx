import { handleReturningUserAction } from "./actions/userActions";
import { IState } from "./models/state";
import React from "react";
import "./App.css";
import { connect } from "react-redux";

interface AppProps {
  handleReturningUser(): void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

class _App extends React.Component<AppProps> {
  render() {
    return <div>hi!</div>;
  }

  async componentDidMount() {
    const { handleReturningUser } = this.props;

    await handleReturningUser();
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    isLoading: state.isLoading,
    error: state.error,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
