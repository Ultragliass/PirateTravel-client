import { IState } from "../../models/state";
import { _Navbar } from "./Navbar";
import { logoutUserAction } from "../../actions/userActions";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
  };
};

const mapDispatchToProps = {
  logoutUser: logoutUserAction,
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);
