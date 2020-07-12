import { IAction } from "../models/action";
import { Dispatch } from "react";
import io from "socket.io-client";
import { getToken } from "./token";
import { Actions } from "../redux/reducer";
import { logoutUserAction as logoutUser } from "./userActions";
import { startLoading } from "./utility";
import axios from "axios";

const SOCKET_ENDPOINT = "http://localhost:3001";
const BASE_LINK = "http://localhost:3001/vacations/";

export const connectSocketIoAction = () => {
  return async (dispatch: Dispatch<IAction>) => {
    startLoading(dispatch);

    const socket = await io.connect(SOCKET_ENDPOINT);

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
        })
        .on("unauthorized", (msg: string) => {
          logoutUser();
        });
    });
  };
};

export const getVacationsAction = () => {
  return async (dispatch: Dispatch<IAction>) => {
    startLoading(dispatch);

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

    try {
    } catch (error) {
      logoutUser();
    }
  };
};
