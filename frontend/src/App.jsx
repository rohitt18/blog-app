// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Topbar from "./components/topbar/Topbar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SinglePostPage from "./pages/singlePostPage/SinglePostPage";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/posts/:postId">
          <SinglePostPage />
        </Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />} </Route>
      </Switch>
    </Router>
  );
};

export default App;
