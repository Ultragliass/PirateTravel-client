import { getState, getDispatch } from "..";

export function getSocketActions() {
  const { socket } = getState();

  const dispatch = getDispatch();

  socket?.on("toggle_follow", () => {console.log("followed")});
}
