import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AjoutPorte from "../Components/AjoutPorte";
import AjoutPorte_FormAjout from "../Components/AjoutPorte_FormAjout"
import AjoutPorte_FormVerif from "../Components/AjoutPorte_FormVerif"

import {Snackbar} from 'react-native-paper';

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
        //expect(wrap.find("[testID='id']").get(0)).toEqual(1);
        //expect(wrap.find("testID='pswd'").value.length).toEqual(0);
    });

    it('should submit an API request on press of the button', () => {
        let idPorte = "1";
        let password = "testeteste"
        axios.post.mockResolvedValue({
            data : true
        })
        const wrap = shallow(<AjoutPorte_FormVerif />);
        /*const wrap = shallow(<AjoutPorte_FormVerif 
                                setMessage = {(msg) => mockMessage(msg)}
                                setDoor = {(id) => mockDoor(id)}
                            />);*/
        wrap.setState({idPorte : idPorte,password : password});
        wrap.find('[testID="button-verif"]').simulate('click');
        expect(axios.post.mockResolvedValue()).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    })

   /* it('should update text input value on change', () => {
        let id = 1
        let pswd = "abcdefghij"
        const wrap = shallow(<AjoutPorte_FormVerif/>)
        wrap.find("[testID='id']").simulate('change', {
            target: { value: id }
        })
        wrap.find("[testID='pswd']").simulate('change', {
            target: { value: pswd }
        })
        expect(wrap.find("[testID='id']").get(0).value).toBe(id);
        expect(wrap.find("[testID='pswd']").get(0).value).toBe(pswd);
    });*/
});
/*
describe ("AjoutPorte Component - Adding form" , () => {
    it('renders without crashing', () => {
        shallow(<AjoutPorte_FormAjout/>);
    });

    it('should by default render verification form', () => {
        const wrap = shallow(<AjoutPorte_FormAjout/>);
    });
});
*/