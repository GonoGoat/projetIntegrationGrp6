import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Inscription from "../Components/Inscription";

import {Snackbar} from 'react-native-paper';

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Inscription Component" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<Inscription/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default and no e-mail verify', () => {
        const wrap = shallow(<Inscription/>)
        expect(wrap.state('error')).toEqual("");
        expect(wrap.state('mailVerified')).toEqual(false);
        const instance = wrap.instance();
        expect(instance.name).toBe("");
        expect(instance.firstname).toBe("");
        expect(instance.phone).toBe("");
        expect(instance.mail).toBe("");
        expect(instance.password).toBe("");
        expect(instance.confirm).toBe("");
    });

    it ("should be empty by default ", () => {
        const wrap = shallow(<Inscription/>)
        expect(wrap.find("[testID='mail']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='password']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='firstname']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='name']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='phone']").at(0).prop('value')).toEqual("");
        expect(wrap.find("[testID='confirm']").at(0).prop('value')).toEqual("");

    });

    it ("should change values on user input value", () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        const wrap = shallow(<Inscription/>)
        const instance = wrap.instance();
        wrap.find("[testID='mail']").at(0).simulate('changeText', mail);
        wrap.find("[testID='password']").at(0).simulate('changeText', pwd);
        expect(instance.mail).toBe(mail);
        expect(instance.password).toBe(pwd);
    });


    it('should submit an API request on press of the button', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : true
        });
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@outlook.Fr";
        instance.gender = "M";
        instance.password = "Passw0rd!";
        instance.confirm = "Passw0rd!";
        wrap.find("[testID='submit']").simulate('press');
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
        expect(wrap.state('error')).toEqual("");
    });

    it("shouldn't submit an API request on press of the button because the mail already exist", () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : true
        });
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@gmail.com";
        instance.gender = "M";
        instance.password = "Passw0rd!";
        instance.confirm = "Passw0rd!";
        wrap.find("[testID='submit']").simulate('press');
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
        expect(wrap.state('error')).toEqual("vous possédez déjà un compte avec cette adresse mail");
    });

    it('_submit failed because of the password and should change the state error', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@outlook.Fr";
        instance.gender = "M";
        instance.password = "Passw0rd!1";
        instance.confirm = "Passw0rd!";
        instance._submit();
        expect(wrap.state('error')).toEqual("Le mot de passe et celui de confirmation doivent être identique");
    });

    it('_submit failed because of the firstname or the name and should change the state error', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        instance.firstname = "Lucas1";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@outlook.Fr";
        instance.gender = "M";
        instance.password = "Passw0rd!";
        instance.confirm = "Passw0rd!";
        instance._submit();
        expect(wrap.state('error')).toEqual("Le nom et le prénom ne peuvent contenir que des lettres");
    });

    it('_submit failed because of the phone and should change the state error', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014a";
        instance.mail = "arle060620@outlook.Fr";
        instance.gender = "M";
        instance.password = "Passw0rd!";
        instance.confirm = "Passw0rd!";
        instance._submit();
        expect(wrap.state('error')).toEqual("le téléphone ne peut contenir que des chiffres");
    });

    it('_submit failed because of the password security and should change the state error', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@outlook.Fr";
        instance.gender = "M";
        instance.password = "lol";
        instance.confirm = "lol";
        instance._submit();
        expect(wrap.state('error')).toEqual("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
    });

    it('_submit failed because of the mail and should change the state error', () => {
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        instance.firstname = "Lucas";
        instance.name = "Pastori";
        instance.phone = "0476090014";
        instance.mail = "arle060620@outlook";
        instance.gender = "M";
        instance.password = "Passw0rd!";
        instance.confirm = "Passw0rd!";
        instance._submit();
        expect(wrap.state('error')).toEqual("l'email n'est pas valide");
    });


});
