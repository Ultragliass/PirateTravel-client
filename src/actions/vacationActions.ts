import { IAction } from "../models/action";
import { IVacation } from "../models/vacation";
import { getToken } from "./token";
import { Actions } from "../redux/reducer";
import { logoutUserAction as logoutUser } from "./userActions";
import { startLoading, displayError } from "./utility";
import { Dispatch } from "react";
import axios from "axios";

const BASE_LINK = "http://localhost:3001/vacations/";

export const getVacationsAction = () => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    startLoading(dispatch);
    try {
      const response = await axios({
        method: "GET",
        url: BASE_LINK,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const { vacations } = response.data;

      dispatch({
        type: Actions.getVacations,
        payload: {
          vacations,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };
};

export const addVacationAction = (vacation: {
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number | string;
  image: string;
  followers: 0;
  isFollowing: 0;
}) => {
  return async (dispatch: Dispatch<IAction>): Promise<boolean> => {
    startLoading(dispatch);

    let success = false;

    try {
      const response = await axios({
        method: "POST",
        url: BASE_LINK,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: { ...vacation },
      });

      success = true;

      const { id, msg } = response.data;

      dispatch({
        type: Actions.addVacation,
        payload: {
          vacation: { ...vacation, id },
          msg,
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    } finally {
      return success;
    }
  };
};

export const toggleFollowAction = (id: number, isFollowing: number) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    startLoading(dispatch);

    try {
      const response = await axios({
        method: "PUT",
        url: `${BASE_LINK}${id}/toggle_follow`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const { msg } = response.data;

      dispatch({
        type: Actions.toggleFollow,
        payload: {
          id,
          isFollowing,
          msg,
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};

export const editVacationAction = (vacation: IVacation, id: number) => {
  return async (dispatch: Dispatch<IAction>): Promise<boolean> => {
    startLoading(dispatch);

    let success = false;

    try {
      const response = await axios({
        method: "PUT",
        url: `${BASE_LINK}${id}/edit`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: { ...vacation },
      });

      const { msg } = response.data;

      success = true;

      dispatch({
        type: Actions.editVacation,
        payload: {
          vacation: { ...vacation, id },
          msg,
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    } finally {
      return success;
    }
  };
};

export const deleteVacationAction = (id: Number) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    startLoading(dispatch);

    try {
      const response = await axios({
        method: "DELETE",
        url: `${BASE_LINK}${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const { msg } = response.data;

      dispatch({
        type: Actions.deleteVacation,
        payload: {
          id,
          msg,
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};
