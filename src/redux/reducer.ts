import { IState } from "../models/state";
import { IAction } from "../models/action";
import { IVacation } from "../models/vacation";

const initState: IState = {
  attemptedLogin: false,
  userData: null,
  isAdmin: false,
  vacations: [],
  error: null,
  message: null,
  isLoggedIn: false,
  isLoading: false,
  socket: null,
};

export enum Actions {
  loginUser = "LOGIN_USER",
  logoutUser = "LOGOUT_USER",
  getSocket = "GET_SOCKET",
  getVacations = "GET_VACATIONS",
  addVacation = "ADD_VACATION",
  toggleFollow = "TOGGLE_FOLLOW",
  deleteVacation = "DELETE_VACATION",
  editVacation = "EDIT_VACATION",
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
        message: null,
        attemptedLogin: true,
      };
    }

    case Actions.logoutUser: {
      state.socket?.close();

      return {
        ...initState,
        attemptedLogin: true,
      };
    }

    case Actions.getSocket: {
      const { socket } = action.payload;

      return {
        ...state,
        socket,
        isLoading: false,
        error: null,
        message: null,
      };
    }

    case Actions.getVacations: {
      const { vacations } = action.payload;

      vacations.sort(sortArray);

      return {
        ...state,
        vacations,
        error: null,
        message: null,
      };
    }

    case Actions.addVacation: {
      const { vacation, msg } = action.payload;

      const modifiedVacations = state.vacations.slice();

      modifiedVacations.push(vacation);

      return {
        ...state,
        vacations: modifiedVacations,
        isLoading: false,
        error: null,
        message: state.isAdmin ? msg : `NEW VACATION ADDED.`,
      };
    }

    case Actions.toggleFollow: {
      const { id, isFollowing, msg } = action.payload;

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
        message: state.isAdmin ? null : msg,
      };
    }

    case Actions.editVacation: {
      const { vacation, msg } = action.payload;

      const modifiedVacations = state.vacations.slice();

      const index = modifiedVacations.findIndex((v) => v.id === vacation.id);

      modifiedVacations[index] = vacation;
      modifiedVacations[index].isFollowing = state.vacations[index].isFollowing;

      return {
        ...state,
        vacations: modifiedVacations,
        isLoading: false,
        error: null,
        message: state.isAdmin ? msg : `${vacation.destination}: UPDATED`,
      };
    }

    case Actions.deleteVacation: {
      const { id, msg } = action.payload;

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
        message: state.isAdmin ? msg : "A VACATION HAS BEEN REMOVED.",
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
        message: null,
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
