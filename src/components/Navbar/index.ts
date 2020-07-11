import { IState } from "../../models/state";
import { connect } from "react-redux";
import { _Navbar } from "./Navbar";
import { logoutUserAction } from "../../actions/userActions";

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
