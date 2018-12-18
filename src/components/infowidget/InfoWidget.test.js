import React from 'react';
import {shallow} from 'enzyme';
import InfoWidget from './';

describe('InfoWidget Component', ()=>{
    it('should display all properties', ()=>{
        const title = 'home';
        const address = 'No.1 Morton loop';
        const lat = '51.165691';
        const lng = '10.451526000000058';

        const props ={
            title,
            address,
            lat,
            lng
        }

        const infoWidget = shallow(<InfoWidget {...props}/>);
        expect(infoWidget.find('.title').text()).toBe(title);
        expect(infoWidget.find('.address').text()).toBe(address);
        expect(infoWidget.find('.lat').text()).toBe(lat);
        expect(infoWidget.find('.lng').text()).toBe(lng);
    })

    it('should render correctly', ()=>{
        const title = 'home';
        const address = 'No.1 Morton loop';
        const lat = '51.165691';
        const lng = '10.451526000000058';

        const props ={
            title,
            address,
            lat,
            lng
        }

        const infoWidget = shallow(<InfoWidget {...props}/>);
        expect(infoWidget).toMatchSnapshot();
    })
})