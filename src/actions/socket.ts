import { getState, getDispatch } from "..";
import { Actions } from "../redux/reducer";

export function getSocketActions() {
  const { socket } = getState();

  const dispatch = getDispatch();

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
}
