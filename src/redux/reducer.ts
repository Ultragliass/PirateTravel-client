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
}

export const redcer = (state: IState = initState, action: IAction): IState => {
  switch (action.type) {
    case Actions.loginUser: {
      const { userType, userData } = action.payload;

      return {
        ...state,
        userData,
        isAdmin: userType === "admin",
        isLoggedIn: true,
        isLoading: false,
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
      };
    }

    default: {
      return state;
    }
  }
};
