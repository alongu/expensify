import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// We use the Switch so react will go over each route below, and if it does not find the page -> it will go to the last one - the 404.
// using the exact to NOT show always the ExpenseDashboardPage, marked as "/". so only in the localhost:8080/ it will get to the dashboard
// edit with the /:id allowing us to change the id and use that input from user 

// <BrowserReouter/> componenet from react-router-dom uses the browser history by default.
// We want to be able to control the history, and that's why the history is added here, to component Router, and NOT using the BrowserRouter component

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
