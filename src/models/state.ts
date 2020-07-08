import { IVacation } from "./vacation";

interface User {
  username: string;
  name: string;
  lastname: string;
}

export interface IState {
  username: null | User;
  isAdmin: boolean;
  vacations: IVacation[];
  error: null | string;
  isLoggedIn: boolean;
  isLoading: boolean;
}
