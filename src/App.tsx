import { IState } from "./models/state";
import { handleReturningUserAction } from "./actions/userActions";
import { Navbar } from "./components/Navbar";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { RegisterPage } from "./components/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import BaseTransition from "./components/BaseTransition/BaseTransition";
import { VacationPage } from "./components/VacationsPage";
import {
  connectSocketIoAction,
  getVacationsAction,
} from "./actions/vacationActions";
import { ErrorBar } from "./components/ErrorBar";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";
import { EditPage } from "./components/EditPage";
import { AddPage } from "./components/AddPage";
import { StatisticsPage } from "./components/StatisticsPage";
import { TransitionGroup } from "react-transition-group";
import "fontsource-roboto";
import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { Switch, Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import { IVacation } from "./models/vacation";

interface AppProps {
  handleReturningUser(): void;
  connectSocketIo(): void;
  isLoggedIn: boolean;
  socket: null | typeof Socket;
  isAdmin: boolean;
  vacations: IVacation[];
  getVacations(): void;
}

class _App extends React.PureComponent<AppProps> {
  render() {
    const { isLoggedIn, isAdmin } = this.props;

    this.handleSocketConnect();

    this.handleGetVacations();

    return (
      <>
        <CssBaseline />
        <Navbar />

        <TransitionGroup>
          <Switch>
            <AdminRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              exact
              path="/statistics"
            >
              <BaseTransition>
                <StatisticsPage />
              </BaseTransition>
            </AdminRoute>

            <AdminRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              exact
              path="/add"
            >
              <BaseTransition>
                <AddPage />
              </BaseTransition>
            </AdminRoute>

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
          </Switch>
        </TransitionGroup>

        <ErrorBar />
        <Loading />
      </>
    );
  }

  componentDidMount = async () => {
    const { handleReturningUser } = this.props;

    await handleReturningUser();
  };

  handleSocketConnect = () => {
    const { connectSocketIo, socket, isLoggedIn } = this.props;

    if (!socket && isLoggedIn) {
      connectSocketIo();
    }
  };

  handleGetVacations = async () => {
    const { isLoggedIn, getVacations, vacations } = this.props;

    if (isLoggedIn && !vacations.length) {
      await getVacations();
    }
  };
}

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    socket: state.socket,
    isAdmin: state.isAdmin,
    vacations: state.vacations,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
  connectSocketIo: connectSocketIoAction,
  getVacations: getVacationsAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
