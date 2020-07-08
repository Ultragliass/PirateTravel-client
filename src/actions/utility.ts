import { IAction } from "../models/action";
import { Actions } from "../redux/reducer";
import { Dispatch } from "react";
import { AxiosError } from "axios";

export function startLoading(dispatch: Dispatch<IAction>): void {
  dispatch({
    type: Actions.loadingStart,
    payload: {},
  });
}

export function displayError(dispatch: Dispatch<IAction>, err: AxiosError) {
  const error = err.response?.data.msg;

  if (error.includes('"password" with')) {
    return dispatch({
      type: Actions.displayError,
      payload: {
        error: "PASSWORD DOES NOT MEET STANDARDS.",
      },
    });
  }

  if (error.includes('"name" with' || '"lastname" with')) {
    return dispatch({
      type: Actions.displayError,
      payload: {
        error: "NAME AND LAST NAME MAYBE ONLY BE ALPHABETICAL.",
      },
    });
  }

  const editedError = error.replace(/['"]+/g, "").toUpperCase() + ".";

  dispatch({
    type: Actions.displayError,
    payload: {
      error: editedError,
    },
  });
}

export function validateInputs(
  dispatch: Dispatch<IAction>,
  ...args: string[]
): boolean {
  let isValid = true;

  args.forEach((arg) => {
    if (!arg?.trim() || !arg) {
      isValid = false;
    }
  });

  if (!isValid) {
    dispatch({
      type: Actions.displayError,
      payload: {
        error: "PLEASE FILL IN THE FORM.",
      },
    });
  }

  return isValid;
}
