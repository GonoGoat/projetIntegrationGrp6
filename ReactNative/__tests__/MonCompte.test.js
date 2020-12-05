import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from "modal-react-native-web";


import MonCompte from "../Components/MonCompte";

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Inscription Component" , () => {

    const navigation = {navigate: jest.fn()};

    it('renders without crashing', () => {
        const wrap = shallow(<MonCompte/>);
        expect(wrap.exists()).toBe(true);
    });


})
