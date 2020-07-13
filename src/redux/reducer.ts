import { IState } from "../models/state";
import { IAction } from "../models/action";
import { IVacation } from "../models/vacation";

const initState: IState = {
  userData: null,
  isAdmin: false,
  vacations: [],
  error: null,
  isLoggedIn: false,
  isLoading: false,
  socket: null,
};

export enum Actions {
  loginUser = "LOGIN_USER",
  logoutUser = "LOGOUT_USER",
  getSocket = "GET_SOCKET",
  getVacations = "GET_VACATIONS",
  toggleFollow = "TOGGLE_FOLLOW",
  deleteVacation = "DELETE_VACATION",
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
      state.socket?.close();

      return initState;
    }

    case Actions.getSocket: {
      const { socket } = action.payload;

      return {
        ...state,
        socket,
        isLoading: false,
        error: null,
      };
    }

    case Actions.getVacations: {
      const { vacations } = action.payload;

      vacations.sort(sortArray);

      return {
        ...state,
        vacations,
        error: null,
      };
    }

    case Actions.toggleFollow: {
      const { id, isFollowing } = action.payload;

      const modifiedVacations = state.vacations.slice();

      const index = modifiedVacations.findIndex(
        (vacation) => vacation.id === id
      );

      if (state.isAdmin) {
        modifiedVacations[index].followers += isFollowing ? -1 : 1;
      } else {
        modifiedVacations[index].isFollowing = isFollowing ? 0 : 1;
      }

      modifiedVacations.sort(sortArray);

      return {
        ...state,
        vacations: modifiedVacations,
        isLoading: false,
        error: null,
      };
    }

    case Actions.deleteVacation: {
      const { id } = action.payload;

      const modifiedVacations = state.vacations.slice();

      const index = modifiedVacations.findIndex(
        (vacation) => vacation.id === id
      );

      modifiedVacations.splice(index, 1);

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

function sortArray(x: IVacation, y: IVacation) {
  return x.isFollowing === y.isFollowing ? 0 : x.isFollowing ? -1 : 1;
}
