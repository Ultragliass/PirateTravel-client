import { _VacationsPage } from "./VacationsPage";
import { IState } from "../../models/state";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
    userData: state.userData,
    isAdmin: state.isAdmin,
  };
};

export const VacationPage = connect(mapStateToProps)(_VacationsPage);
