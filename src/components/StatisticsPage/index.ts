import { IState } from "../../models/state";
import { _StatisticsPage } from "./StatisticsPage";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
  };
};

export const StatisticsPage = connect(mapStateToProps)(_StatisticsPage);
