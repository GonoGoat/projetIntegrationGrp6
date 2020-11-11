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
import Connection from '../Components/Connection';
import AsyncStorage from '@react-native-community/async-storage';

Enzyme.configure({ adapter: new Adapter() });

describe("Connection Class Component", () => {
  it("should call _storedata", () => {
    const wrapper = shallow(<Connection />);
    expect(wrapper.length).toBe(1);
  });

  it('calls getitem on retrieving data', async () => {
    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.retrieveData('user');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user');
  });

  const navigation = { navigate: jest.fn() };

  it('calls storeData twice on getHistory', async () => {
    const wrapper = shallow(<Connection navigation={navigation} />);
    const componentInstance = wrapper.instance();
    componentInstance.getHistory(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('changes state on checkuser without values', async () => {
    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.checkUser();
    expect(wrapper.state('errorMessage')).toBe('Verify mail or password');
  });

  it('changes state on checkuser with wrong values', async () => {
    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.mail = "unexistant@mail.address";
    componentInstance.password = "RandomPassword123";
    componentInstance.checkUser();
    expect(wrapper.state('errorMessage')).toBe('Verify mail or password');
  });

  it('calls getHistory on connection with existing user', async () => {
    const wrapper = shallow(<Connection navigation={navigation} />);
    const componentInstance = wrapper.instance();
    const spy = jest.spyOn(componentInstance, "getHistory")
    componentInstance.mail = "a@a.a";
    componentInstance.password = "Azerty2@";
    componentInstance.checkUser();
    expect(spy).toHaveBeenCalled()
  });

});