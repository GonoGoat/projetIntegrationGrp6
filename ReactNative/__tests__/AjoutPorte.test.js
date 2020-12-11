import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AjoutPorte from "../Components/AjoutPorte";
import AjoutPorte_FormAjout from "../Components/AjoutPorte_FormAjout"
import AjoutPorte_FormVerif from "../Components/AjoutPorte_FormVerif"

import {Snackbar} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("AjoutPorte Component" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<AjoutPorte/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should by default render verification form', () => {
        const wrap = shallow(<AjoutPorte/>)
        expect(wrap.containsMatchingElement(<AjoutPorte_FormVerif/>)).toBeTruthy();
        expect(wrap.containsMatchingElement(<AjoutPorte_FormAjout/>)).toBeFalsy();
    });

    it('should render adding form if a door is selected', () => {
        const wrap = shallow(<AjoutPorte/>)
        wrap.setState({door : 1})
        expect(wrap.containsMatchingElement(<AjoutPorte_FormVerif/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<AjoutPorte_FormAjout/>)).toBeTruthy();
    });

    it("displays the message on change of the message and then disapear",() => {
        const wrap = shallow(<AjoutPorte/>);
        wrap.setState({message : {type:'fail',message:'test'}})
        bar = wrap.find(Snackbar).props().visible
        expect(bar).toEqual(true);
        setTimeout(function(){ expect(bar).toEqual(false); }, 5000);
    })
});

describe ("AjoutPorte Component - Verification Form" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<AjoutPorte_FormVerif/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default', () => {
        const wrap = shallow(<AjoutPorte_FormVerif/>)
        expect(wrap.state('idPorte')).toEqual("");
        expect(wrap.state('password')).toEqual("");
        expect(wrap.find("[testID='id']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='pswd']").at(0).prop('value')).toEqual("");
    });

   it('should update state depending on the user\'s input', () => {
        let id = "1"
        let pswd = "abcdefghij"
        const wrap = shallow(<AjoutPorte_FormVerif/>)
        wrap.find("[testID='id']").at(0).simulate('changeText', id);
        wrap.find("[testID='pswd']").at(0).simulate('changeText', pswd);
        expect(wrap.find("[testID='id']").at(0).prop('value')).toEqual(id);
        expect(wrap.find("[testID='pswd']").at(0).prop('value')).toEqual(pswd);
    });

    it('should submit an API request on press of the button and on pressing ENTER in the Text Inputs', () => {
        let idPorte = "1";
        let password = "testeteste"
        axios.post.mockResolvedValue({
                data : true
        })
        const wrap = shallow(<AjoutPorte_FormVerif />);
        wrap.setState({idPorte : idPorte,password : password});
        wrap.find("[testID='button-verif']").simulate('press');
        wrap.find("[testID='id']").at(0).simulate('submitEditing');
        wrap.find("[testID='pswd']").at(0).simulate('submitEditing');
        expect(axios.post).toHaveBeenCalledTimes(3);
        jest.clearAllMocks();
    });

    it('should change the message of the parent component if the inputs aren\'t correct', () => {
        const mockMessage = jest.fn();
        const mockDoor = jest.fn(); 
        let test = [{id : "",password:"testeteste"},{id:"1",password:""},
                    {id:"oui",password:"testeteste"},{id:"1",password:"false"}]
        axios.post.mockResolvedValue({
            data : true
        })
        const wrap = shallow(<AjoutPorte_FormVerif 
                                setMessage = {(msg) => mockMessage(msg)}
                                setDoor = {(id) => mockDoor(id)}
                            />);
        let instance = wrap.instance();
        for (var i=0;i<test.length;i++) {
            wrap.setState({idPorte : test[i].id,password : test[i].password});
            instance.submit()
        }
        expect(axios.post).toHaveBeenCalledTimes(0);
        expect(mockMessage).toHaveBeenCalledTimes(i);
        expect(mockDoor).toHaveBeenCalledTimes(0);
        jest.clearAllMocks();
    });

    /*it('should change the message of the parent component if the server answered badly', () => {
        const mockMessage = jest.fn();
        const mockDoor = jest.fn(); 
        let test = [{id : "1",password:"testeteste"},{id:"2",password:"autreteste"}]
        axios.post.mockResolvedValue({
            data: true
          });
        const wrap = shallow(<AjoutPorte_FormVerif 
                                setMessage = {(msg) => mockMessage(msg)}
                                setDoor = {(id) => mockDoor(id)}
                            />);
        let instance = wrap.instance();
        for (var i=0;i<test.length;i++) {
            wrap.setState({idPorte : test[i].id,password : test[i].password,user:1});
            instance.submit()
        }
        expect(mockMessage).toHaveBeenCalledTimes(0);
        expect(mockDoor).toHaveBeenCalledTimes(i);
        jest.clearAllMocks();
    });*/

    //it('should call the props function to edit doorId if the API call was successful', () => {
        
    
    //})
});

describe ("AjoutPorte Component - Adding form" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<AjoutPorte_FormAjout/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default', () => {
        const wrap = shallow(<AjoutPorte_FormAjout/>)
        expect(wrap.state('nickname')).toEqual("");
        expect(wrap.state('tag')).toEqual("");
        expect(wrap.find("[testID='name']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='tag']").at(0).prop('value')).toEqual("");
    });

    it('should update state depending on the user\'s input', () => {
        let tag = "test"
        let name = "test"
        const wrap = shallow(<AjoutPorte_FormAjout/>)
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='tag']").at(0).simulate('changeText', tag);
        expect(wrap.find("[testID='name']").at(0).prop('value')).toEqual(name);
        expect(wrap.find("[testID='tag']").at(0).prop('value')).toEqual(tag);
    });

    it('should submit an API request on press of the button and on pressing ENTER in the Text Inputs', () => {
        let name = "test";
        let tag = "test"
        axios.post.mockResolvedValue({
                data : true
        })
        const wrap = shallow(<AjoutPorte_FormAjout />);
        wrap.setState({nickname : name,tag : tag});
        wrap.find("[testID='button-ajout']").simulate('press');
        wrap.find("[testID='name']").at(0).simulate('submitEditing');
        wrap.find("[testID='tag']").at(0).simulate('submitEditing');
        expect(axios.post).toHaveBeenCalledTimes(3);
        jest.clearAllMocks();
    });

    it('should change the message of the parent component if the inputs aren\'t correct', () => {
        const mockMessage = jest.fn();
        const mockDoor = jest.fn(); 
        let test = [{tag : "",nickname:"test"},{tag:"test",nickname:""},
                    {tag:"1",nickname:"test"},{tag:"test",nickname:"2"}]
        axios.post.mockResolvedValue({
            data : true
        })
        const wrap = shallow(<AjoutPorte_FormAjout
                                setMessage = {(msg) => mockMessage(msg)}
                                setDoor = {(id) => mockDoor(id)}
                                doorId={1}
                            />);
        let instance = wrap.instance();
        for (var i=0;i<test.length;i++) {
            wrap.setState({tag : test[i].tag,nickname : test[i].nickname});
            instance.submit()
        }
        expect(axios.post).toHaveBeenCalledTimes(0);
        expect(mockMessage).toHaveBeenCalledTimes(i);
        expect(mockDoor).toHaveBeenCalledTimes(0);
        jest.clearAllMocks();
    });

    it('should reset the state door of the parent if the user decides to go back', () => {
        const mockDoor = jest.fn();
        const wrap = shallow(<AjoutPorte_FormAjout
            setDoor = {(id) => mockDoor(id)}
            doorId={1}
        />);
        wrap.find("[testID='back']").simulate('press');
        expect(mockDoor).toHaveBeenCalledTimes(1);
        expect(mockDoor).toHaveBeenCalledWith(undefined);
    })
});
