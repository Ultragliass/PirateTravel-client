import React, { useEffect } from "react";
import { IVacation } from "../../models/vacation";

interface VacationsPageProps {
  connectSocketIo(): void;
  getVacations(): void;
  vacations: IVacation[];
  socket: null | SocketIOClientStatic;
}

export function _VacationsPage(props: VacationsPageProps) {
  const { connectSocketIo, getVacations, vacations, socket } = props;

  useEffect(() => {
    if (!vacations.length) {
      getVacations();
    }

    if (!socket) {
      connectSocketIo();
    }
  }, []);

  return <div></div>;
}
