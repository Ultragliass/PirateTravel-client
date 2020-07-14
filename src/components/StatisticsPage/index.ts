import { IState } from "../../models/state";
import { connect } from "react-redux";
import { _StatisticsPage } from "./StatisticsPage";

const mapStateToProps = (state: IState) => {
  return {
    vacations: state.vacations,
  };
};

export const StatisticsPage = connect(mapStateToProps)(_StatisticsPage);
