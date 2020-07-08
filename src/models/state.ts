import { IVacation } from "./vacation";
import { IUser } from "./user";

export interface IState {
  userData: null | IUser;
  isAdmin: boolean;
  vacations: IVacation[];
  error: null | string;
  isLoggedIn: boolean;
  isLoading: boolean;
}
