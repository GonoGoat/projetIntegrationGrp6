import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
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

  it('calls setData on getHistory', () => {
    axios.get.mockResolvedValue({
      data: [{door : 1}, {door : 3}]
    });
    const wrapper = shallow(<Connection />);
    const instance  = wrapper.instance();
    instance.getHistory(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });

  it('Redirect should clear state and input values', () => {
    const wrap = shallow(<Connection  navigation={navigation} />);
    const instance = wrap.instance();
    instance.redirect();
    expect(instance.state.mail).toBe('')
    expect(instance.state.password).toBe('')
    expect(instance.state.errorMessage).toBe('')
  })
});

describe("Connection Functions", () => {
  it ("should create component", () => {
    const wrapper = shallow(<Connection />)
    expect(wrapper.exists()).toBe(true);
  });

  it ("should be empty by default ", () => {
    const wrap = shallow(<Connection />)
    expect(wrap.find("[testID='mail']").at(0).prop('value')).toEqual("");
    expect(wrap.find("[testID='password']").at(0).prop('value')).toEqual("");
  })

  it ("should change values on user input value", () => {
    let mail = "this@is.mail"
    let pwd = "Passw0rd!"
    const wrap = shallow(<Connection/>)
    wrap.find("[testID='mail']").at(0).simulate('changeText', mail);
    wrap.find("[testID='password']").at(0).simulate('changeText', pwd);
    expect(wrap.find("[testID='mail']").at(0).prop('value')).toEqual(mail);
    expect(wrap.find("[testID='password']").at(0).prop('value')).toEqual(pwd);
  });

  it("should not call API and display password error message", () => {
    let mail = "test";
    let password = "testeteste"
    axios.post.mockResolvedValue({
      data : true
    })
    const wrap = shallow(<Connection />);
    wrap.setState({mail : mail,password : password});
    wrap.find("[testID='connexion']").simulate('press');
    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(wrap.instance().state.errorMessage).toEqual("Le mot de passe ne répond pas aux contraintes de l'inscription")
    jest.clearAllMocks();
  })

  it("should not call API and display mail error message", async () => {
    let mail = "1";
    let password = "Passw0rd!"
    axios.post.mockResolvedValue({
      status : false,
      msg : ""
    })
    const wrap = shallow(<Connection />);
    wrap.setState({mail : mail,password : password});
    wrap.find("[testID='connexion']").simulate('press');
    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(await wrap.instance().state.errorMessage).toEqual("L'email n'est pas valide")
    jest.clearAllMocks();
  })

  it("should call API and display mail error message", async () => {
    let mail = "existe@pas.mail";
    let password = "Passw0rd!"
    let data = "Cette adresse mail n'existe pas encore. Veuillez vous inscrire."
    axios.post.mockResolvedValue({
      status : false,
      msg : data
    })
    const wrap = shallow(<Connection />);
    wrap.setState({mail : mail, password : password});
    wrap.find("[testID='connexion']").simulate('press');
    expect(axios.post).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  })
})