import { IState } from "../../models/state";
import { connect } from "react-redux";
import { _ErrorBar } from "./ErrorBar";
import { dismissErrorAction } from "../../actions/userActions";

const mapStateToProps = (state: IState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  dismissError: dismissErrorAction,
};

export const ErrorBar = connect(mapStateToProps, mapDispatchToProps)(_ErrorBar);
