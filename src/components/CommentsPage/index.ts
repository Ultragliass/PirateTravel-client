import { _CommentsPage } from "./CommentsPage";
import { IState } from "../../models/state";
import {
  toggleFollowAction,
  deleteVacationAction,
  getVacationCommentsAction,
  addCommentAction,
} from "../../actions/vacationActions";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    isAdmin: state.isAdmin,
    vacations: state.vacations,
  };
};

const mapDispatchToProps = {
  toggleFollow: toggleFollowAction,
  deleteVacation: deleteVacationAction,
  getVacationComments: getVacationCommentsAction,
  addComment: addCommentAction,
};

export const CommentsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CommentsPage);
