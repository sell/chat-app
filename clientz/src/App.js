import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Home, ErrorPage, Chat } from './components';
function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/chat" component={Chat} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    );
}
export default App;