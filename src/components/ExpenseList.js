import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// This is also exported (named export) for testing needs
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense} />
                    })
                )
        }
    </div>
);

// Since this is a react component, and change to the state in the global store -> will cause the component to re-render with the new state!
// That is what the react-redux does.
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);

// Connect is a function that returns a function that excepts as an argument that in turn will return the HOC
// The method that goes as an argument to the connect method actually tells - What information from the store do we want to access
// The store state is passed into the connect method, and with the method we choose what to pass to the ExpenseList component in this case
// So here we choose to get the state.expenses as the props into the ExpenseList component we've created above
// Our component (ExpenseList) does not have to worry about the state, subscribe etc..
// more explanation can be found in the playground/hoc.js file about the HOC

// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;