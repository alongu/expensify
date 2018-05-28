import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  // now we have access to the full API, in airbnb.io/enzyme/docs/api/shallow.html
  const wrapper = shallow(<Header startLogout={() => { }}/>); 
  
  // TESTING EXAMPLES (with Enzyme): //
  //expect(wrapper.find('#somethingId')) --> FIND BY ID
  //expect(wrapper.find('.something-class')) --> FIND BY CLASS
  //expect(wrapper.find('h1')) --> FIND BY HTML TAG
  //expect(wrapper.find('h1').length).toBe(1); // Validate there is ONLY 1 <h1> tag in the Header ..
  //expect(wrapper.find('h1').text()).toBe('Expensify'); // Validate there is ONLY 1 <h1> tag in the Header ..

  expect(wrapper).toMatchSnapshot(); // by using the jest.config.json file!
});

// shuold call startLogout on button click //
test ('shuold call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
