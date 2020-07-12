import { _VacationsPage } from "./VacationsPage";
import {
  getVacationsAction,
} from "../../actions/vacationActions";
import { connect } from "react-redux";
import { IState } from "../../models/state";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
    userData: state.userData,
  };
};

const mapDispatchToProps = {
  getVacations: getVacationsAction,
};

export const VacationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_VacationsPage);
