import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./sass/main.scss";
import Home from "./pages/Home";
import Lista from "./pages/Lista";
import Medarbetare from "./pages/Medarbetare";



ReactDOM.render(
  <Router>
     <div className="wrapper-x">

      {/*<IsMobile />
     <Link to="/">
        <button>Home</button>
      </Link>
      */}
    

      <Route exact path="/" component={Home} />
      <Route exact path="/lista" component={Lista} />
      <Route exact path="/medarbetare/:slug" component={Lista} />
      <Route exact path="/medarbetare/:slug/:user" component={Medarbetare} />

    </div>

  </Router>,

 
  document.getElementById("root")
);