import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MotDePasseOublie from "../Components/MotDePasseOublie";

import axios from 'axios';
import Inscription from "./Inscription.test";

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Inscription Component" , () => {

    const navigation = {navigate: jest.fn()};

    it('renders without crashing', () => {
        const wrap = shallow(<MotDePasseOublie/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default and no e-mail verify', () => {
        const wrap = shallow(<MotDePasseOublie/>);
        const instance = wrap.instance();
        expect(wrap.state('type')).toEqual("");
        expect(wrap.state('mailVerif')).toEqual(false);
        expect(wrap.state('error')).toEqual("");
        expect(instance.mail).toEqual("");
    });

    it ("should verify the mail and success", () => {
        let mail = "arle060620@gmail.com";
        const wrap = shallow(<MotDePasseOublie/>);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : true
        });
        wrap.find("[testID='mail']").at(0).simulate('changeText', mail);
        instance._verifyMail(instance.mail);
        expect(wrap.state('type')).toEqual("success");
        expect(wrap.state('mailVerif')).toEqual(false);
        expect(wrap.state('error')).toEqual("Votre mot de passe a été réinitialisé.");
        expect(instance.mail).toEqual(mail);
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    it ("should verify the mail and fail", () => {
        let mail = "arle060620@gmail";
        const wrap = shallow(<MotDePasseOublie/>);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : false
        });
        wrap.find("[testID='mail']").at(0).simulate('changeText', mail);
        wrap.find("[testID='submit']").simulate('press');
        expect(wrap.state('type')).toEqual("fail");
        expect(wrap.state('mailVerif')).toEqual(false);
        expect(wrap.state('error')).toEqual("Veuillez insérer un e-mail valide.");
        expect(instance.mail).toEqual(mail);
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    it ("should go back on nav", () => {
        const wrap = shallow(<MotDePasseOublie navigation={navigation}/>);
        const instance = wrap.instance();
        //wrap.find("[testID='back']").simulate('press');
    });
});
