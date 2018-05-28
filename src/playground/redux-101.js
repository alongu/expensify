import { createStore } from 'redux';

// Actions are a way to communicate with the store, in which the state is saved.
// using store.dispatch() method to change the state
// using store.getState() method to get the state.
// type is a must in redux
// to set the default state -> the createStore() is called once, and called again in any store.dispatch() call

// store.subscribe() gets a method that is being called EVERY TIME the store Changes! great way to do something when the state changes
// store.unsubscribe() 

// Action Generators - functions that return action objects //
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: 'incrementBy'
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
    // this is same as writing decrementBy: 'decrementBy'
});

const setCount = ({ count }) => ({
    type: 'SET'
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers //
// 1. Reducers are pure functions (functions that their output is determined ONLY by its input parameters)
// 2. Never change a state or action
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return {
            count: state.count + action.incrementBy
        };
        case 'DECREMENT':
        return {
            count: state.count - action.decrementBy
        };
        case 'SET':
        return {
            count: action.count
        };
        case 'RESET':
        return{
            count: 0
        };
        default:
            return state;
    }
};

// This is the create store method that actually does something with the actions and state, according to switch case
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(resetCount());
store.dispatch(setCount({ count: 101 }));

console.log(store.getState());