import { IState } from "../../models/state";
import { _Loading } from "./Loading";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
    return {
      isLoading: state.isLoading,
    };
  };
  
  export const Loading = connect(mapStateToProps)(_Loading);