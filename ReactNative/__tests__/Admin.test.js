import React from "react"
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Admin from "../Components/Admin";
import Error from "../Components/Error"

import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import {TextInput} from "react-native"

jest.mock('@react-native-community/async-storage');

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Admin Component" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<Admin/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should render a loading screen if the state isLoading is true', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({isLoading : true});
        expect(wrap.containsMatchingElement(<ActivityIndicator/>)).toBeTruthy();
        expect(wrap.containsMatchingElement(<Error/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<TextInput/>)).toBeFalsy();
    });

   it('should render error component if no users are connected', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : false,isLoading : ""});
        expect(wrap.containsMatchingElement(<Error/>)).toBeTruthy()
        expect(wrap.containsMatchingElement(<ActivityIndicator/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<TextInput/>)).toBeFalsy();
    });

    it('should render the adding form if the connected user is admin', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        expect(wrap.containsMatchingElement(<Error/>)).toBeFalsy()
        expect(wrap.containsMatchingElement(<ActivityIndicator/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<TextInput/>)).toBeTruthy();
    });

    it('should display an error if the input is bad', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        wrap.find("[testID='button-ajout']").simulate('press');
        expect(wrap.find("[testID='snack']").first().prop('visible')).toEqual(true);
    });

    it('should make the error disapear by pressing the error button', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        wrap.find("[testID='button-ajout']").simulate('press');
        wrap.find("[testID='snack']").first().prop("action").onPress();
        expect(wrap.find("[testID='snack']").first().prop('visible')).toEqual(false);
    });

    it('should make the error disapear by dismissing it', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        wrap.find("[testID='button-ajout']").first().simulate('press');
        wrap.find("[testID='snack']").first().simulate('dismiss');
        expect(wrap.find("[testID='snack']").first().prop('visible')).toEqual(false);
    });

    it('should update the state ipAddress if an input is selected', () => {
        let ip = "1.1.1.1";
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        wrap.find("[testID='ip']").first().simulate('changeText', ip);
        expect(wrap.find("[testID='ip']").first().prop('value')).toEqual(ip);
        expect(wrap.state().ipAddress).toEqual(ip);
    });

    it('should update the state status depending on the selected radio button', () => {
        const wrap = shallow(<Admin/>);
        wrap.setState({user : "1",isLoading : ""});
        wrap.find("[testID='on']").first().simulate('press');
        expect(wrap.find("[testID='on']").first().prop('status')).toEqual("checked")
        expect(wrap.find("[testID='off']").first().prop('status')).toEqual("unchecked")
        expect(wrap.state().status).toEqual(1);
        wrap.find("[testID='off']").first().simulate('press');
        expect(wrap.find("[testID='off']").first().prop('status')).toEqual("checked")
        expect(wrap.find("[testID='on']").first().prop('status')).toEqual("unchecked")
        expect(wrap.state().status).toEqual(0);
    });

    it('should show the modal on press of the button and on pressing ENTER in the Text Inputs', () => {
        let ip = '1.1.1.1';
        const wrap = shallow(<Admin />);
        wrap.setState({user : "1",isLoading : ""});
        wrap.setState({ipAddress : ip});
        wrap.find("[testID='button-ajout']").simulate('press');
        expect(wrap.state().isModalVisible).toEqual(true);
        wrap.setState({isModalVisible : false})
        wrap.find("[testID='ip']").first().simulate('submitEditing');
        expect(wrap.state().isModalVisible).toEqual(true);
    });

    it('should stop displaying modal on press of the "No" button', () => {
        const wrap = shallow(<Admin />);
        wrap.setState({user : "1",isLoading : ""});
        wrap.setState({isModalVisible : true});
        wrap.find("[testID='no']").simulate('press');
        expect(wrap.state().isModalVisible).toEqual(false);
    });

    it('should make an api call if the "Yes" button on the modal is selected', () => {
        let res = {
            id : "1",
            password : "Test12345!",
            ipAddress : "1.1.1.1",
            status : "0"
        };
        axios.post.mockResolvedValue({
            data : res
        })
        const wrap = shallow(<Admin />);
        wrap.setState({user : "1",isLoading : ""});
        wrap.setState({isModalVisible : true});
        wrap.find("[testID='yes']").simulate('press');
        expect(axios.post).toHaveBeenCalledTimes(1);
    })

    it('should render the final component is data exists', () => {
        let res = {
            id : "1",
            password : "Test12345!",
            ipAddress : "1.1.1.1",
            status : "0"
        };
        const wrap = shallow(<Admin />);
        wrap.setState({user : "1",isLoading : ""});
        wrap.setState({
            id : res.id,
            password : res.password,
            ipAddress : res.ipAddress,
            status : res.status
        })
        expect(wrap.containsMatchingElement(<ActivityIndicator/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<Error/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<TextInput/>)).toBeFalsy();
    });

    it('should come back to home page if press the "Go back" button', () => {
        let res = {
            id : "1",
            password : "Test12345!",
            ipAddress : "1.1.1.1",
            status : "0"
        };
        const wrap = shallow(<Admin />);
        wrap.setState({user : "1",isLoading : ""});
        wrap.setState({
            id : res.id,
            password : res.password,
            ipAddress : res.ipAddress,
            status : res.status
        })
        wrap.find("[testID='back']").simulate('press');
        expect(wrap.containsMatchingElement(<Error/>)).toBeFalsy()
        expect(wrap.containsMatchingElement(<ActivityIndicator/>)).toBeFalsy();
        expect(wrap.containsMatchingElement(<TextInput/>)).toBeTruthy();
    })
})