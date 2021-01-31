import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllAds from "./components/AllAds";
import BestAd from "./components/BestAd";
import CreateAd from "./components/CreateAd";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/ads" className="navbar-brand">
            Apester
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/allAds"} className="nav-link">
                All Ads
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/bestAd"} className="nav-link">
                Best Ad
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/createAd"} className="nav-link">
                Create Ad
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/allAds"]} component={AllAds} />
            <Route path="/bestAd" component={BestAd} />
            <Route exact path="/createAd" component={CreateAd} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;