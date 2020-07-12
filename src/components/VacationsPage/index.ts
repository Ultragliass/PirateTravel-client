import { _VacationsPage } from "./VacationsPage";
import {
  connectSocketIoAction,
  getVacationsAction,
} from "../../actions/vacationActions";
import { connect } from "react-redux";
import { IState } from "../../models/state";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
    socket: state.socket,
  };
};

const mapDispatchToProps = {
  connectSocketIo: connectSocketIoAction,
  getVacations: getVacationsAction,
};

export const VacationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_VacationsPage);
