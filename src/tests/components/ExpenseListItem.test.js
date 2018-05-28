import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

// This is a test for when expenses exists //
test('should render ExpenseList with expenses', () => {
    // Expend the object available in expenses, and grab the first item, adding ALL its properties to props in the ExpectedListItem
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>); 
    expect(wrapper).toMatchSnapshot();
});
