import React from "react";
import { Redirect, Route } from "react-router-dom";

export function AdminRoute({ isLoggedIn, isAdmin, ...props }: any) {
  if (!isLoggedIn || !isAdmin) {
    return <Redirect to="/vacations" />;
  }

  return <Route {...props} exact />;
}
