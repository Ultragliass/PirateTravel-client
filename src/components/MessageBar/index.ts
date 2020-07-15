import { IState } from "../../models/state";
import { _MessageBar } from "./MessageBar";
import { dismissErrorAction } from "../../actions/utility";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    message: state.message,
  };
};

const mapDispatchToProps = {
  dismissError: dismissErrorAction,
};

export const MessageBar = connect(mapStateToProps, mapDispatchToProps)(_MessageBar);
