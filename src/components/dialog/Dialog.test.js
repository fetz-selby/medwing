import React from 'react';
import {shallow} from 'enzyme';
import Dialog from './Dialog';

describe('Dialog Component', ()=>{
    it('should display message passed with props', ()=>{
        const message = 'show this';

        const dialog = shallow(<Dialog message='show this'/>);
        expect(dialog.find('.dialog-container .message-container .message').text()).toBeEqual('show this');
    })
})