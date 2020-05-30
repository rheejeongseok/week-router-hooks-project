import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./component/Header";
import Recipe from "./component/Recipe";
import RecipeDetail from "./component/RecipeDetail";
import Chef from "./component/Chef";
import ChefDetail from "./component/ChefDetail";
import RecipeFind from "./component/RecipeFind";
import RecipeNews from "./component/RecipeNews";

export default function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className="container-fluid">
          <div className="jumbotron">
            <Switch>
              <Route exact path={"/"} component={Recipe} />
              <Route path={"/recipe_detail"} component={RecipeDetail} />
              <Route path={"/chef"} component={Chef} />
              <Route path={"/chef_detail"} component={ChefDetail} />
              <Route path={"/news"} component={RecipeNews} />
              <Route path={"/find"} component={RecipeFind} />
            </Switch>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}
