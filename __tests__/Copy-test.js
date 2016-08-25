import React from 'react';
import {
    shallow
} from 'enzyme';

import Copy from '../src/components/common/Copy';

describe('<Copy />', () => {
    it('should be input', () => {
        const wrapper = shallow(<Copy />);

        expect(wrapper.type()).toBe('input');
    });
});