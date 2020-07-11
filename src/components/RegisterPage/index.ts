import { registerUserAction } from "../../actions/userActions";
import { _RegisterPage } from "./RegisterPage";
import { connect } from "react-redux";

const mapDispatchToProps = {
  registerUser: registerUserAction,
};

export const RegisterPage = connect(null, mapDispatchToProps)(_RegisterPage);
