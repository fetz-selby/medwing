import React from 'react';
import {shallow} from 'enzyme';
import Loader from './BasicLoader';

const defaultText = 'Loading ';
const module = 'Test';
const loader = shallow(<Loader module={module} />);

describe('Loader Component', ()=>{
    it('should should concat `module` text to default text', ()=>{
        expect(loader.find('.loader').text()).toEqual(defaultText+module+' ...')
    })
})