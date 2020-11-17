import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import renderer from 'react-test-renderer';
import { waitFor } from 'react-native-testing-library';
import Inscription from '../Components/Inscription';
import AsyncStorage from '@react-native-community/async-storage';

Enzyme.configure({ adapter: new Adapter() });

describe("Inscription Class Component", () => {

    const navigation = { navigate: jest.fn() };

    it("call getEmail without value", () => {
        const wrapper = shallow(<Inscription navigation={navigation}/>);
        const componentInstance = wrapper.instance();
        componentInstance.getEmail("","","","","","","","");
        expect(wrapper.state('error')).toBe('vous possédez déjà un compte avec cette adresse mail');
    });

});
