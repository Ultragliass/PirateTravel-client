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
import { getVacationsAction } from "./actions/vacationActions";
import { ErrorBar } from "./components/ErrorBar";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";
import { EditPage } from "./components/EditPage";
import { AddPage } from "./components/AddPage";
import { StatisticsPage } from "./components/StatisticsPage";
import { TransitionGroup } from "react-transition-group";
import "fontsource-roboto";
import "./App.css";
import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { Switch, Redirect } from "react-router-dom";
import { IVacation } from "./models/vacation";
import { MessageBar } from "./components/MessageBar";

interface AppProps {
  handleReturningUser(): void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  vacations: IVacation[];
  getVacations(): void;
  attemptedLogin: boolean;
}

interface AppState {
  value: string;
}

class _App extends React.PureComponent<AppProps, AppState> {
  state = {
    value: "",
  };

  render() {
    const { isLoggedIn, isAdmin, attemptedLogin } = this.props;

    const { value } = this.state;

    if (!attemptedLogin) {
      return null;
    }

    this.handleGetVacations();

    return (
      <>
        <CssBaseline />
        <Navbar value={value} handleInputChange={this.handleInputChange} />

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
                <VacationPage value={value} />
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

        <MessageBar />
        <ErrorBar />
        <Loading />
      </>
    );
  }

  componentDidMount = async () => {
    const { handleReturningUser } = this.props;

    await handleReturningUser();
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    this.setState({ value });
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
    isAdmin: state.isAdmin,
    vacations: state.vacations,
    attemptedLogin: state.attemptedLogin
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
  getVacations: getVacationsAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
