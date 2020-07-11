import { loginUserAction } from "../../actions/userActions";
import _LoginPage from "./LoginPage";
import { connect } from "react-redux";

const mapDispatchToProps = {
  loginUser: loginUserAction,
};

export const LoginPage = connect(null, mapDispatchToProps)(_LoginPage);
