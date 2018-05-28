// Expenses Reducer //
const expensesRedcuerDefaultState = [];

const expensesReducer = (state = expensesRedcuerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            // DO NOT USE state.push!!! because it changes the state array!!!
            // THIS IS GREAT: return state.concat(action.expense); but we want to do it with the SPREAD OPERATOR (...)
            return [ ...state, action.expense ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    // Return an expense, that includes all the expense existing properties,
                    // But override its properties with the properties from the updates from user
                    // We do it by using the "transform-object-rest-spread" operator we've installed (located in .babelrc as plugin)
                    // That actually spreads an object, and allow us to override some of its properties, or add new properties
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

export default expensesReducer;