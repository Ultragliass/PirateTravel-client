import { IState } from "../models/state";
import { IAction } from "../models/action";

const initState: IState = {
  username: null,
  isAdmin: false,
  vacations: [],
  error: null,
  isLoggedIn: false,
  isLoading: false,
};

export enum Actions {}

export const redcer = (state: IState = initState, action: IAction): IState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
