import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Deconnection from '../Components/Deconnection';

Enzyme.configure({ adapter: new Adapter() });

describe("Deconnection Class Component", () => {

    const navigation = { navigate: jest.fn() };

    it('Should clear data', async () => {
        const wrapper = shallow(<Deconnection navigation={navigation} />);
        const componentInstance = wrapper.instance();
        componentInstance.clearAllData();
        expect(AsyncStorage.clear).toHaveBeenCalled();
    })
});