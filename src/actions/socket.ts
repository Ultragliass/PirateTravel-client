import { getDispatch } from "..";
import { Actions } from "../redux/reducer";
import { startLoading } from "./utility";
import { getToken } from "./token";
import { logoutUserAction as logoutUser } from "./userActions";
import io from "socket.io-client";

const SOCKET_ENDPOINT = "http://localhost:3001";

export const connectSocketIo = (): void => {
  const dispatch = getDispatch();

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

        socket?.on("toggle_follow", ({ id, isFollowing }: any) => {
          dispatch({
            type: Actions.toggleFollow,
            payload: {
              id: Number(id),
              isFollowing,
            },
          });
        });

        socket?.on("delete_vacation", ({ id }: any) => {
          dispatch({
            type: Actions.deleteVacation,
            payload: {
              id: Number(id),
            },
          });
        });

        socket?.on("update_vacation", ({ vacation }: any) => {
          dispatch({
            type: Actions.editVacation,
            payload: {
              vacation,
            },
          });
        });

        socket?.on("add_vacation", ({ vacation }: any) => {
          dispatch({
            type: Actions.addVacation,
            payload: {
              vacation,
            },
          });
        });

        socket.on("add_comment", ({ id, comment }: any) => {
          dispatch({
            type: Actions.addComment,
            payload: {
              id: Number(id),
              comment,
            },
          });
        });
      })
      .on("unauthorized", () => {
        logoutUser();
      });
  });
};
