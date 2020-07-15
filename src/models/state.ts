import { IVacation } from "./vacation";
import { IUser } from "./user";
import { Socket } from "socket.io-client";

export interface IState {
  userData: null | IUser;
  isAdmin: boolean;
  vacations: IVacation[];
  error: null | string;
  message: null | string;
  isLoggedIn: boolean;
  isLoading: boolean;
  socket: null | typeof Socket;
}
