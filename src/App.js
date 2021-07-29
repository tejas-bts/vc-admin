import { Switch, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import AdminProfile from "./components/Profile/AdminProfile";
import AdminAbout from "./components/Profile/AdminAbout";
import { Fragment, useState } from "react";
import authContext from "./Context/authContext";
import NavBar from "./components/core/NavBar/NavBar";

import Organisations from "./components/Organisations";

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
      <div class="view-wrapper is-full">
        <Switch>
          <authContext.Provider value={{ allData, setAllData }}>
            <Route exact path="/adminProfile" component={AdminProfile} />
            <Route exact path="/adminAbout" component={AdminAbout} />
            <Route exact path="/search" component={SearchResults} />
            <Route path="/organisations" component={Organisations} />
          </authContext.Provider>
        </Switch>
      </div>  
    </Fragment>
  );
}

export default App;
