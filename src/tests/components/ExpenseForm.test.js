import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

// The ExpenseForm uses the moment() to get the current Timestamp.
// This is causing us trouble to test because everytime we will run it - the snapsoht will be different.
// To solve this - we will need to use Mocking of the moment class - returning a moment in a specific timestamp everytime.
// in docs (facebook.github.io/jst/docs/en/manual-mocks.html) we can find it under manual-mocks
// We've created a moment.js file in the __mocks__ library, which magically solves our problem, and perform the mocking in Jest

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />); 
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>); 
    expect(wrapper).toMatchSnapshot();
});

test('should render Error for invalid form submitting', () => {
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot(); // take a snapshot before the error event simulation
    
    // Simulate an Event, just the like would do - like user ClickButton()
    // First argument is the eventName to be  executed ('submit', 'click', etc..)
    // Second argument is an object containing the properties of the event ('e.preventDefault).
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // makes sure that after the error state changes - it actually get rendered
});

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />); 

    // When using find('input') we are getting many'input' tags, so we want the first one. at(0) does that.
    const value = 'New description';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm />); 

    const value = 'New note value';
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const wrapper = shallow(<ExpenseForm />); 

    const value = '23.50'; // valid value
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should set amount if invalid input', () => {
    const wrapper = shallow(<ExpenseForm />); 

    const value = '12.122'; // invalid value
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

// This test uses Spies  => 
// it allows us to create fake functions, pass them into our object, and make sure they were called by our object with the right parameters
test('should call onSubmit prop for calid form submission', () => {
    const onSubmitSpy = jest.fn(); // Create the spy
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    // finding the onDateChange property inside the SingleDatePicker in the ExpenseForm 
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const focused = true;
    // finding the onDateChange property inside the SingleDatePicker in the ExpenseForm 
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

