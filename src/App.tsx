import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./containers/LoginPage";
import EntryListPage from "./containers/EntryListPage";
import EntryDetailPage from "./containers/EntryDetailPage";
import EntryPage from "./containers/EntryPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={EntryPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/entrylist">
          <EntryListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/entrylist/:id">
          <EntryDetailPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
