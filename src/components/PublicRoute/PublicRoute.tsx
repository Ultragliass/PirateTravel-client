import React from "react";
import { Redirect, Route } from "react-router-dom";

export function PublicRoute({ isLoggedIn, ...props }: any) {
  if (isLoggedIn) {
    return <Redirect to="/vacations" />;
  }

  return <Route {...props} />;
}