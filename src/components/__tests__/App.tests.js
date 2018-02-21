import React from 'react';
import { shallow } from 'enzyme';

import {App}  from '../App/App';
import List from '../List/List';

describe('В основной верстке должен быть', () => {
    const wrapper = shallow(<App error={0} />);

    it('Wrapper', () => {
        expect(wrapper.find('AppWrapper')).toHaveLength(1);
    });

    it('List', () => {
        expect(wrapper.find(List)).toHaveLength(1);
    });

});