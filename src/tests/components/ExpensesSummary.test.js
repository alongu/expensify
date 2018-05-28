import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

// This is a test for when expenses exists //
test('should render Expenses Summary with 1 expense', () => {
    // Expend the object available in expenses, and grab the first item, adding ALL its properties to props in the ExpectedListItem
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>); 
    expect(wrapper).toMatchSnapshot();
});

test('should render Expenses Summary with multiple expenses', () => {
    // Expend the object available in expenses, and grab the first item, adding ALL its properties to props in the ExpectedListItem
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={123564825}/>); 
    expect(wrapper).toMatchSnapshot();
});
