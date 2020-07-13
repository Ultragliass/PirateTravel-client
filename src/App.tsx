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
import React from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ErrorBar } from "./components/ErrorBar";
import { Switch, Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";
import { EditPage } from "./components/EditPage";

interface AppProps {
  handleReturningUser(): void;
  connectSocketIo(): void;
  isLoggedIn: boolean;
  socket: null | typeof Socket;
  isAdmin: boolean;
}

class _App extends React.PureComponent<AppProps> {
  render() {
    const { isLoggedIn, isAdmin } = this.props;

    this.handleSocketConnect();

    return (
      <>
        <CssBaseline />
        <Navbar />

        <Switch>
          <TransitionGroup>
            <AdminRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              exact
              path="/edit/:id"
            >
              <BaseTransition>
                <EditPage />
              </BaseTransition>
            </AdminRoute>

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

  componentDidMount = async () => {
    const { handleReturningUser } = this.props;

    await handleReturningUser();
  };

  handleSocketConnect = async () => {
    const { connectSocketIo, socket, isLoggedIn } = this.props;

    if (!socket && isLoggedIn) {
      connectSocketIo();
    }
  };
}

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    socket: state.socket,
    isAdmin: state.isAdmin,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
  connectSocketIo: connectSocketIoAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
