import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Notebook from "./pages/notebook/Notebook";
import Projects from "./pages/projects/Projects";
import Services from "./pages/services/Services";
import Articles from "./pages/articles/Articles";
import People from "./pages/people/People";
import PostDetails from "./pages/notebook/PostDetails";
import ProjectDetails from "./pages/projects/ProjectDetails";
import ServiceDetails from "./pages/services/ServiceDetails";
import AddPost from "./pages/notebook/AddPost";
import AddProject from "./pages/projects/AddProject";
import AddService from "./pages/services/AddService";
import AddArticle from "./pages/articles/AddArticle";
import AddPerson from "./pages/people/AddPerson";
import UpdatePost from "./pages/notebook/UpdatePost";
import UpdateProject from "./pages/projects/UpdateProject";
import UpdateService from "./pages/services/UpdateService";
import UpdateArticle from "./pages/articles/UpdateArticle";
import UpdatePerson from "./pages/people/UpdatePerson";

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
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/people" component={People} />
            <Route path="/notebook/:path" component={PostDetails} />
            <Route path="/projects/:path" component={ProjectDetails} />
            <Route path="/services/:path" component={ServiceDetails} />
            <Route path="/addpost" component={AddPost} />
            <Route path="/addproject" component={AddProject} />
            <Route path="/addservice" component={AddService} />
            <Route path="/addarticle" component={AddArticle} />
            <Route path="/addperson" component={AddPerson} />
            <Route path="/updatepost/:path" component={UpdatePost} />
            <Route path="/updateproject/:path" component={UpdateProject} />
            <Route path="/updateservice/:path" component={UpdateService} />
            <Route path="/updateservice/:id" component={UpdateArticle} />
            <Route path="/updateservice/:id" component={UpdatePerson} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
