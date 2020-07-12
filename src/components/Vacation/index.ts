import { toggleFollowAction } from "../../actions/vacationActions";
import { connect } from "react-redux";
import { _Vacation } from "./Vacation";

const mapDispatchToProps = {
  toggleFollow: toggleFollowAction,
};

export const Vacation = connect(null, mapDispatchToProps)(_Vacation);
