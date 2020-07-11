import { handleReturningUserAction } from "./actions/userActions";
import "fontsource-roboto";
import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar } from "./components/Navbar";
import { CssBaseline } from "@material-ui/core";
import { ErrorBar } from "./components/ErrorBar";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";
import { Switch, Redirect } from "react-router-dom";
import { IState } from "./models/state";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { RegisterPage } from "./components/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

interface AppProps {
  handleReturningUser(): void;
  isLoggedIn: boolean;
}

function _App(props: AppProps) {
  const { handleReturningUser, isLoggedIn } = props;

  useEffect(() => {
    handleReturningUser();
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />

      <Switch>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/vacations">
          <div>nigger</div>
        </PrivateRoute>

        <PublicRoute isLoggedIn={isLoggedIn} path="/register">
          <RegisterPage />
        </PublicRoute>

        <PublicRoute isLoggedIn={isLoggedIn} path="/">
          <LoginPage />
        </PublicRoute>

        <Redirect to="/" />
      </Switch>

      <ErrorBar />
      <Loading />
    </>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
