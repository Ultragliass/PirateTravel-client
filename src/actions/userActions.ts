import { IAction } from "../models/action";
import { IRegister } from "../models/register";
import { Actions } from "../redux/reducer";
import { getToken, clearToken, saveToken } from "./token";
import { connectSocketIo } from "./socket";
import { startLoading, displayError, validateInputs } from "./utility";
import { Dispatch } from "react";
import axios from "axios";

const BASE_LINK = "http://localhost:3001/users/";

export const handleReturningUserAction = () => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    const token = getToken();

    if (!token) {
      return dispatch({
        type: Actions.logoutUser,
        payload: {},
      });
    }

    startLoading(dispatch);

    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_LINK}authenticate`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { userData, userType } = response.data;

      dispatch({
        type: Actions.loginUser,
        payload: {
          userType,
          userData,
        },
      });

      connectSocketIo();
    } catch (err) {
      clearToken();

      dispatch({
        type: Actions.logoutUser,
        payload: {},
      });
    }
  };
};

export const loginUserAction = (username: string, password: string) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    const isValid = validateInputs(dispatch, username, password);

    if (!isValid) {
      return;
    }

    startLoading(dispatch);

    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_LINK}login`,
        data: {
          username,
          password,
        },
      });

      setUserData(response, dispatch);
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};

export const registerUserAction = (user: IRegister) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    const isValid = validateInputs(dispatch, ...Object.values({ ...user }));

    if (!isValid) {
      return;
    }

    startLoading(dispatch);

    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_LINK}register`,
        data: {
          ...user,
        },
      });

      setUserData(response, dispatch);
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};

function setUserData(response: any, dispatch: Dispatch<IAction>): void {
  const { token, userData, userType } = response.data;

  saveToken(token);

  dispatch({
    type: Actions.loginUser,
    payload: {
      userType,
      userData,
    },
  });

  connectSocketIo();
}

export const logoutUserAction = () => {
  return (dispatch: Dispatch<IAction>): void => {
    clearToken();

    dispatch({
      type: Actions.logoutUser,
      payload: {},
    });
  };
};
