import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Notebook from "./pages/Notebook";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import PostDetails from "./pages/PostDetails";
import ProjectDetails from "./pages/ProjectDetails";
import ServiceDetails from "./pages/ServiceDetails";
import AddPost from "./pages/posts/AddPost";
import AddProject from "./pages/projects/AddProject";
import AddService from "./pages/services/AddService";
import UpdatePost from "./pages/posts/UpdatePost";
import UpdateProject from "./pages/projects/UpdateProject";
import UpdateService from "./pages/services/UpdateService";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={SignIn} />
            <Route exact path="/notebook" component={Notebook} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/services" component={Services} />
            <Route path="/notebook/:path" component={PostDetails} />
            <Route path="/projects/:path" component={ProjectDetails} />
            <Route path="/services/:path" component={ServiceDetails} />
            <Route path="/addpost" component={AddPost} />
            <Route path="/addproject" component={AddProject} />
            <Route path="/addservice" component={AddService} />
            <Route path="/updatepost/:path" component={UpdatePost} />
            <Route path="/updateproject/:path" component={UpdateProject} />
            <Route path="/updateservice/:path" component={UpdateService} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
