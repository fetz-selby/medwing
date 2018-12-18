import React from 'react';
import { shallow } from 'enzyme';
import DetailForm from './DetailForm';

describe('Detail Form Component', ()=>{
    it('should render [SAVE] on button', ()=>{
        const location = {id: 0, title:'', address: '', lat: '', lng: ''};
        const currentLocationState = jest.fn;
        const onDelete = jest.fn;

        const props ={
            location,
            isUpdate: false,
            currentLocationState,
            onDelete
        }
        
        const df = shallow(<DetailForm {...props}/>);
        expect(df.find('.save-btn').text()).toBe('Save');
    })

    it('should render [UPDATE] on button', ()=>{
        const location = {id: 1, title:'test 1', address: 'street 12', lat: '51.165691', lng: '10.451526000000058'};
        const currentLocationState = jest.fn;
        const onDelete = jest.fn;

        const props ={
            location,
            isUpdate: true,
            currentLocationState,
            onDelete
        }
        
        const df = shallow(<DetailForm {...props}/>);
        expect(df.find('.save-btn').text()).toBe('Update');
    })

    it('should expect props.onUpdate on update clicked', ()=>{
        const location = {id: 1, title:'test 1', address: 'street 12', lat: '51.165691', lng: '10.451526000000058'};
        const currentLocationState = jest.fn;
        const onDelete = jest.fn;
        const onUpdate = jest.fn;

        const props ={
            isUpdate: true,
            currentLocationState,
            onUpdate,
            onDelete,
            location
        }

        const df = shallow(<DetailForm {...props}/>);
        df.find('.save-btn').simulate('click');
        expect(onUpdate).toHaveBeenCalled();
    })

    it('should render correctly', ()=>{
        const location = {id: 1, title:'test 1', address: 'street 12', lat: '51.165691', lng: '10.451526000000058'};
        const currentLocationState = jest.fn;
        const onDelete = jest.fn;
        const onUpdate = jest.fn;

        const props ={
            isUpdate: true,
            currentLocationState,
            onUpdate,
            onDelete,
            location
        }

        const df = shallow(<DetailForm {...props}/>);
        expect(df).toMatchSnapshot();
    })
})