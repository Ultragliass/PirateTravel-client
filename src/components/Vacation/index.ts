import {
  toggleFollowAction,
  deleteVacationAction,
} from "../../actions/vacationActions";
import { connect } from "react-redux";
import { _Vacation } from "./Vacation";
import { IState } from "../../models/state";

const mapStateToProps = (state: IState) => {
  return {
    isAdmin: state.isAdmin,
  };
};

const mapDispatchToProps = {
  toggleFollow: toggleFollowAction,
  deleteVacation: deleteVacationAction,
};

export const Vacation = connect(mapStateToProps, mapDispatchToProps)(_Vacation);
