import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import PostDetails from "./pages/PostDetails";
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
            <Route path="/notebook" component={Notebook} />
            <Route path="/post/:id" component={PostDetails} />
            <Route path="/addpost" component={AddPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
