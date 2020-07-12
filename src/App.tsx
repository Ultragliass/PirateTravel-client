import { handleReturningUserAction } from "./actions/userActions";
import { Navbar } from "./components/Navbar";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";
import { IState } from "./models/state";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { RegisterPage } from "./components/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { TransitionGroup } from "react-transition-group";
import BaseTransition from "./components/BaseTransition/BaseTransition";
import { VacationPage } from "./components/VacationsPage";
import { connectSocketIoAction } from "./actions/vacationActions";
import "fontsource-roboto";
import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ErrorBar } from "./components/ErrorBar";
import { Switch, Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";

interface AppProps {
  handleReturningUser(): void;
  isLoggedIn: boolean;
  connectSocketIo(): void;
  socket: null | typeof Socket;
}

function _App(props: AppProps) {
  const { handleReturningUser, isLoggedIn, connectSocketIo, socket } = props;

  useEffect(() => {
    handleReturningUser();
  }, []); // An empty array as the second argument for the useEffect hook turns it into componentDidMount.

  if (!socket && isLoggedIn) {
    connectSocketIo();
  }

  return (
    <>
      <CssBaseline />
      <Navbar />

      <Switch>
        <TransitionGroup>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/vacations">
            <BaseTransition>
              <VacationPage />
            </BaseTransition>
          </PrivateRoute>

          <PublicRoute isLoggedIn={isLoggedIn} eaxct path="/register">
            <BaseTransition>
              <RegisterPage />
            </BaseTransition>
          </PublicRoute>

          <PublicRoute isLoggedIn={isLoggedIn} exact path="/">
            <BaseTransition>
              <LoginPage />
            </BaseTransition>
          </PublicRoute>

          <Redirect to="/" />
        </TransitionGroup>
      </Switch>

      <ErrorBar />
      <Loading />
    </>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    socket: state.socket,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
  connectSocketIo: connectSocketIoAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
