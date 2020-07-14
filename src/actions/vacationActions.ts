import { IAction } from "../models/action";
import { IVacation } from "../models/vacation";
import { getToken } from "./token";
import { Actions } from "../redux/reducer";
import { logoutUserAction as logoutUser } from "./userActions";
import { startLoading, displayError } from "./utility";
import { getSocketActions } from "./socket";
import { Dispatch } from "react";
import io from "socket.io-client";
import axios from "axios";

const SOCKET_ENDPOINT = "http://localhost:3001";
const BASE_LINK = "http://localhost:3001/vacations/";

export const connectSocketIoAction = () => {
  return (dispatch: Dispatch<IAction>): void => {
    startLoading(dispatch);

    const socket = io.connect(SOCKET_ENDPOINT);

    socket.on("connect", () => {
      socket
        .emit("authenticate", { token: getToken() })
        .on("authenticated", () => {
          dispatch({
            type: Actions.getSocket,
            payload: {
              socket,
            },
          });

          getSocketActions();
        })
        .on("unauthorized", () => {
          logoutUser();
        });
    });
  };
};

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

      const vacations = response.data;

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

      const { id } = response.data;

      dispatch({
        type: Actions.addVacation,
        payload: { vacation: { ...vacation, id } },
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
      await axios({
        method: "PUT",
        url: `${BASE_LINK}${id}/toggle_follow`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      dispatch({
        type: Actions.toggleFollow,
        payload: {
          id,
          isFollowing,
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};

export const deleteVacationAction = (id: Number) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    startLoading(dispatch);

    try {
      await axios({
        method: "DELETE",
        url: `${BASE_LINK}${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      dispatch({
        type: Actions.deleteVacation,
        payload: {
          id,
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
      await axios({
        method: "PUT",
        url: `${BASE_LINK}${id}/edit`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: { ...vacation },
      });

      success = true;

      dispatch({
        type: Actions.editVacation,
        payload: { vacation: { ...vacation, id } },
      });
    } catch (error) {
      displayError(dispatch, error);
    } finally {
      return success;
    }
  };
};
