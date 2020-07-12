import { IAction } from "../models/action";
import { Dispatch } from "react";
import io from "socket.io-client";
import { getToken } from "./token";
import { Actions } from "../redux/reducer";
import { logoutUserAction as logoutUser } from "./userActions";
import { startLoading, displayError } from "./utility";
import axios from "axios";
import { getSocketActions } from "./socket";

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
        .on("unauthorized", (msg: string) => {
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
          isFollowing
        },
      });
    } catch (error) {
      displayError(dispatch, error);
    }
  };
};
