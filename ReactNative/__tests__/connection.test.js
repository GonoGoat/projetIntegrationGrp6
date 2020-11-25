import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Connection from '../Components/Connection';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe("Connection Class Component", () => {

  const navigation = { navigate: jest.fn() };

  it('calls storeData twice on getHistory', async () => {
    let id = 1;
    doors = [8,3]

    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.setData(id, doors);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    jest.clearAllMocks();
  });

  it('changes state on checkuser without values', async () => {
    axios.post.mockResolvedValue({
      data: false
    })
    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.checkUser();
    expect(wrapper.state('errorMessage')).toBe('Le mot de passe ne répond pas aux contraintes de l\'inscription');
    jest.clearAllMocks();
  });

  it('changes state on checkuser with wrong values', async () => {
    let value = 'TestString';
    axios.post.mockResolvedValue({
      data: false
    });

    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.mail = value;
    componentInstance.password = value;
    componentInstance.checkUser();
    expect(componentInstance.state.errorMessage).toBe('Le mot de passe ne répond pas aux contraintes de l\'inscription');
    jest.clearAllMocks();
  });

  it('calls getHistory on connection with existing user', async () => {
    let value = 'TestString';
    axios.post.mockResolvedValue({
      data: 62
    });
    const wrapper = shallow(<Connection navigation={navigation} />);
    const componentInstance = wrapper.instance();
    componentInstance.mail = value;
    componentInstance.password = value;
    componentInstance.checkUser();
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    jest.clearAllMocks();
  });
});

describe("Connection Class render", () => {
  it('Should have 6 texts', async ()=> {
    const wrapper = shallow(<Connection />)
    expect(wrapper.find('Text')).toHaveLength(6);
  })
  it('Should have default empty password and mail', async ()=> {
    const wrapper = shallow(<Connection />)
    expect(wrapper.instance().mail).toBe("");
    expect(wrapper.instance().mail).toBe("");
  })
});