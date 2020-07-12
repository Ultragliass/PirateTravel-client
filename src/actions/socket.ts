import { getState } from "..";

export function getSocketActions() {
  const { socket } = getState();

  socket?.on("toggle_follow", () => {console.log("followed")});
}
