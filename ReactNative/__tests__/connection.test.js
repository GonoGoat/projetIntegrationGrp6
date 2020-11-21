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
    axios.get.mockResolvedValue({
      data : [{door:8},{door: 3}]
    })

    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.getHistory(id);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('changes state on checkuser without values', async () => {
    axios.post.mockResolvedValue({
      data: false
    })
    const wrapper = shallow(<Connection />);
    const componentInstance = wrapper.instance();
    componentInstance.checkUser();
    expect(wrapper.state('errorMessage')).toBe('Veuillez renseigner une valeur dans chaque champ');
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
    expect(componentInstance.state.errorMessage).toBe('Mail et/ou mot de passe incorrect');
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
  });
});

describe("Connection Class render", () => {
  it('Should have 6 texts', async ()=> {
    const wrapper = shallow(<Connection />)
    expect(wrapper.find('Text')).toHaveLength(6);
  })
});