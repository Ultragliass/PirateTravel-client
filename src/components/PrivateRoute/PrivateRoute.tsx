import React from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ isLoggedIn, ...props }: any) {
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
