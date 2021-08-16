import { Switch, Route, Redirect } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import AdminProfile from "./components/Profile/AdminProfile";
import AdminAbout from "./components/Profile/AdminAbout";
import { Fragment, useState } from "react";
import authContext from "./Context/authContext";
import NavBar from "./components/core/NavBar/NavBar";

import Organizations from "./components/Organizations";
import Suppliers from "./components/Suppliers";
import Stores from "./components/Stores";
import Events from "./components/Events";
import Contacts from "./components/Contacts";
import Home from "./components/Home/Home";

function App() {
  let initialState = {
    isAuthenticated: false,
    token: "",
    validToken: false,
    msgToDisplay: "",
    msgType: "",
    msgOn: "",
    userDetails: {
      givenName: null,
      familyName: null,
      imageUrl: null,
      email: null,
    },
  };
  const [allData, setAllData] = useState(initialState);

  return (
    <Fragment>
      <NavBar />
      <div className="view-wrapper is-full">
        <Switch>
          <authContext.Provider value={{ allData, setAllData }}>
            <Route exact path="/adminProfile" component={AdminProfile} />
            <Route exact path="/adminAbout" component={AdminAbout} />
            <Route exact path="/search" component={SearchResults} />
            <Route path="/organizations" component={Organizations} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/stores" component={Stores} />
            <Route path="/events" component={Events} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </authContext.Provider>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
