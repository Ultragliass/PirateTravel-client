import React from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ isLoggedIn, isAdmin, ...props }: any) {
  if (!isLoggedIn || !isAdmin) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
