import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./containers/LoginPage";
import EntryListPage from "./containers/EntryListPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/entrylist">
          <EntryListPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
