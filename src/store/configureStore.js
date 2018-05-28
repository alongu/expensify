// The flow in which we would like to work with DB and Redux together with Components is this:
// 1. Componenets calls actions generator
// 2. Action generator return a function
// 3. Component dispatches function (?)
// 4. function runs (has the ability to dispatch other actions and do whatever it wants)

// By default - Redux does NOT allow you to dispach functions!!!

// We want to push data to fire base and attach a callback => and if succeeded => the callback will dispatch an action in the store.
// We want to do the above in an asyncroniasly matter.
// Components should NOT know about the firebase, or any other database. They should only need to know about what they show

// Adding the ApplyMiddleware allows adding of the Redux-Thunk
// Adding Redux-Thunk allows Redux to dispach functions! which is what we want.

// The below code is the full configuration for Redux with dispatching functions in an asyncronysasly matter

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

