import { _VacationsPage } from "./VacationsPage";
import { getVacationsAction } from "../../actions/vacationActions";
import { IState } from "../../models/state";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
    userData: state.userData,
    isAdmin: state.isAdmin,
  };
};

const mapDispatchToProps = {
  getVacations: getVacationsAction,
};

export const VacationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_VacationsPage);
