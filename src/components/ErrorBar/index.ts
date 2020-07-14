import { IState } from "../../models/state";
import { _ErrorBar } from "./ErrorBar";
import { dismissErrorAction } from "../../actions/utility";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  dismissError: dismissErrorAction,
};

export const ErrorBar = connect(mapStateToProps, mapDispatchToProps)(_ErrorBar);
