import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Notebook from "./pages/Notebook";
import AddPost from "./pages/AddPost";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/notebook" component={Notebook} />
            <Route exact path="/addpost" component={AddPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
