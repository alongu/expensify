// This file is for whenever we use enzyme in our testcases -> it will be adding support for v.16 of react

import DotEnv from 'dotenv';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});

DotEnv.config({ path: '.env.test' });