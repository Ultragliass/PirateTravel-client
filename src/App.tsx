import { handleReturningUserAction } from "./actions/userActions";
import { IState } from "./models/state";
import "fontsource-roboto";
import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar } from "./components/Navbar";

interface AppProps {
  handleReturningUser(): void;
  isLoading: boolean;
  error: string | null;
}

function _App(props: AppProps) {
  useEffect(()=> {
    props.handleReturningUser();
  }, [null]);

  return <Navbar />;
}

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.isLoading,
    error: state.error,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
