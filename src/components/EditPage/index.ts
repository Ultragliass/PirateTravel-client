import { IState } from "../../models/state";
import { _EditPage } from "./EditPage";
import { editVacationAction } from "../../actions/vacationActions";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
  };
};

const mapDispatchToProps = {
  editVacation: editVacationAction,
};

export const EditPage = connect(mapStateToProps, mapDispatchToProps)(_EditPage);
