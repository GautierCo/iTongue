import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* Components */

import Contact from "../Contact";
import Terms from "../Terms";

/* Styles */
import "destyle.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

/* Containers */
import Signup from "../../containers/Signup";
import Login from "../../containers/Login";
import Admin from "../../containers/Admin/Index";
import Profil from "../../containers/User/Profil";
import EditProfil from "../../containers/User/EditProfil";
import Team from "../../containers/Team/Team";
import IrecordsPage from "../../containers/IrecordsPage";
import IusersPage from "../../containers/IusersPage";
import Search from "../../containers/Search";
import Feed from "../../containers/Feed";
import Home from "../../containers/Home";
import IfollowersiFollowing from "../../containers/ifollowersifollowing";
import Favoris from "../../containers/Favoris";
import Message from "../../containers/Chat/Message";
import Conversations from "../../containers/Chat/Conversations";

const App = ({ isLogged, setCaptchaToken, user, socketConnect, pyroVisible }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://www.google.com/recaptcha/api.js?render=6Lc948MZAAAAAHbqOeJ8QPogf8mHhgrv25BzveZV";

        script.addEventListener("load", () => {
            window.grecaptcha.ready((_) => {
                window.grecaptcha
                    .execute("6Lc948MZAAAAAHbqOeJ8QPogf8mHhgrv25BzveZV", {
                        action: "itongue",
                    })
                    .then((token) => {
                        setCaptchaToken(token);
                        document
                            .querySelector(".grecaptcha-badge")
                            .classList.add("hidden");
                    });
            });
        });

        document.body.appendChild(script);
    }, [setCaptchaToken]);

    useEffect(() => {
        if (user) {
            socketConnect();
        }
    }, [socketConnect]);

    return (
        <div className="App">
            <ToastContainer autoClose={2000} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/signup"
                    render={() => (isLogged ? <Redirect to="/feed" /> : <Signup />)}
                />
                <Route
                    path="/login"
                    render={() => (isLogged ? <Redirect to="/feed" /> : <Login />)}
                />
                <Route path="/search" component={Search} />
                <Route path="/irecords" component={IrecordsPage} />
                <Route path="/users" component={IusersPage} />
                <Route exact path="/user/:slug" component={Profil} />
                <Route exact path="/contact" component={Contact} />
                <Route
                    exact
                    path="/user/:slug/edit"
                    render={() => (isLogged ? <EditProfil /> : <Redirect to="/login" />)}
                />
                <Route
                    exact
                    path="/feed"
                    render={() => (isLogged ? <Feed /> : <Redirect to="/login" />)}
                />
                <Route
                    exact
                    path="/favoris"
                    render={() => (isLogged ? <Favoris /> : <Redirect to="/login" />)}
                />
                <Route
                    exact
                    path="/messages"
                    render={() =>
                        isLogged ? <Conversations /> : <Redirect to="/login" />
                    }
                />
                <Route
                    exact
                    path="/messages/:slug/:id"
                    render={() => (isLogged ? <Message /> : <Redirect to="/login" />)}
                />
                <Route exact path="/ifollowers" component={IfollowersiFollowing} />
                <Route exact path="/ifollowing" component={IfollowersiFollowing} />
                <Route path="/admin" component={Admin} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/team" component={Team} />
                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>

            {pyroVisible && (
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
            )}
        </div>
    );
};
export default App;
