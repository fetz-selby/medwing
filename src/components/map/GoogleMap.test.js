import React from 'react';
import {shallow} from 'enzyme';
import GoogleMap from './';

describe('Map Component', ()=>{
    it('should render maps correctly', ()=>{
        const locations = [{id: 1, lat: '5.5427477', lng: '-0.2565425', address: 'Dansoman, Accra, Ghana', selected: false},
                           {id: 2, lat: '5.7273492', lng: '0.0163231', address: 'Community 25, Tema, Tema, Ghana', selected: false},
                           {id: 3, lat: '5.5367445', lng: '-0.2420576', address: 'Mamprobi, Accra, Ghana', selected: false},
                           {id: 4, lat: '5.5682665', lng: '-0.1717396', address: 'Labone, Accra, Ghana', selected: false}];

        const map = shallow(<GoogleMap locations={locations} keys=''/>);
        expect(map).toMatchSnapshot();
    })
})