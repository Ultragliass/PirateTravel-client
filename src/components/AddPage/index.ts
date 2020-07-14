import { _AddPage } from "./AddPage";
import { addVacationAction } from "../../actions/vacationActions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  addVacation: addVacationAction,
};

export const AddPage = connect(null, mapDispatchToProps)(_AddPage);
