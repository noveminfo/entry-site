import React, { Component, ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";

interface Props {
  children: ReactElement;
  [key: string]: any;
}

export default function PrivateRoute({ children, ...rest }: Props) {
  const [user, error] = useAuthState(auth);
  // console.log(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
