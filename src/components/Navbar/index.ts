import { IState } from "../../models/state";
import { connect } from "react-redux";
import { _Navbar } from "./Navbar";

const mapStateToProps = (state: IState) => {
    return {
      isLoggedIn: state.isLoggedIn,
      isAdmin: state.isAdmin,
      userData: state.userData
    };
  };

  export const Navbar = connect(mapStateToProps)(_Navbar);