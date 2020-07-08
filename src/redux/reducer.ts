import { IState } from "../models/state";
import { IAction } from "../models/action";

const initState: IState = {
  userData: null,
  isAdmin: false,
  vacations: [],
  error: null,
  isLoggedIn: false,
  isLoading: false,
};

export enum Actions {
  loginUser = "LOGIN_USER",
  logoutUser = "LOGOUT_USER",
  getVacations = "GET_VACATIONS",
  toggleFollow = "TOGGLE_FOLLOW",
  loadingStart = "LOADING_START",
  displayError = "DISPLAY_ERROR",
}

export const reducer = (state: IState = initState, action: IAction): IState => {
  switch (action.type) {
    case Actions.loginUser: {
      const { userType, userData } = action.payload;

      return {
        ...state,
        userData,
        isAdmin: userType === "admin",
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };
    }

    case Actions.logoutUser: {
      return initState;
    }

    case Actions.getVacations: {
      const { vacations } = action.payload;

      return {
        ...state,
        vacations,
        isLoading: false,
        error: null,
      };
    }

    case Actions.toggleFollow: {
      const { id, isFollowing } = action.payload;

      const modifiedVacations = state.vacations.slice();

      const index = modifiedVacations.findIndex(
        (vacation) => vacation.id === id
      );

      if (isFollowing) {
        modifiedVacations[index].isFollowing = 0;
      } else {
        modifiedVacations[index].isFollowing = 1;
      }

      return {
        ...state,
        vacations: modifiedVacations,
        isLoading: false,
        error: null,
      };
    }

    case Actions.loadingStart: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case Actions.displayError: {
      const { error } = action.payload;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
