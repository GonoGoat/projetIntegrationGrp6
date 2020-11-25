import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Inscription from "../Components/Inscription";

import {Snackbar} from 'react-native-paper';

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Inscription Component" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<Inscription/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default and no e-mail verify', () => {
        const wrap = shallow(<Inscription/>)
        expect(wrap.state('error')).toEqual("");
        expect(wrap.state('mailVerified')).toEqual(false);
    });
});
