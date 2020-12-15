import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Inscription from "../Components/Inscription";

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Inscription Component" , () => {

    const navigation = { navigate: jest.fn() };

    it('renders without crashing', () => {
        const wrap = shallow(<Inscription />);
        expect(wrap.exists()).toBe(true);
    });

    it('should have empty fields by default and no e-mail verify', () => {
        const wrap = shallow(<Inscription/>)
        expect(wrap.state('error')).toEqual("");
        expect(wrap.state('mailVerified')).toEqual(false);
        expect(wrap.state('name')).toEqual("");
        expect(wrap.state('firstname')).toEqual("");
        expect(wrap.state('phone')).toEqual("");
        expect(wrap.state('mail')).toEqual("");
        expect(wrap.state('password')).toEqual("");
        expect(wrap.state('confirm')).toEqual("");
    });

    it ("should change values on user input value", () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription/>)
        const instance = wrap.instance();
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        expect(wrap.state('name')).toEqual(name);
        expect(wrap.state('firstname')).toEqual(firstname);
        expect(wrap.state('phone')).toEqual(phone);
        expect(wrap.state('mail')).toEqual(mail);
        expect(wrap.state('password')).toEqual(pwd);
        expect(wrap.state('confirm')).toEqual(confirm);
    });

    it ("should be empty after _submit() ", () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : true
        });
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('name')).toEqual("");
        expect(wrap.state('firstname')).toEqual("");
        expect(wrap.state('phone')).toEqual("");
        expect(wrap.state('mail')).toEqual("");
        expect(wrap.state('password')).toEqual("");
        expect(wrap.state('confirm')).toEqual("");
        expect(wrap.state('error')).toEqual("");
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    it('should submit an API request on press of the button', () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription/>);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : true
        });
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        wrap.find("[testID='submit']").simulate('press');
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
        expect(wrap.state('error')).toEqual("");
    });

    it("shouldn't submit an API request on press of the button because the mail already exist", () => {
        let mail = "this@is.mail";
        const wrap = shallow(<Inscription/>);
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        const instance = wrap.instance();
        axios.post.mockResolvedValue({
            data : false
        });
        instance._getMail();
        expect(axios.post).toHaveBeenCalledTimes(2);
        jest.clearAllMocks();
        expect(wrap.state('error')).toEqual("");
        expect(wrap.state('mailVerified')).toEqual(false);
    });

    it('_submit failed because of the password and should change the state error', () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!&";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('error')).toEqual("Le mot de passe et celui de confirmation doivent être identique");
    });

    it('_submit failed because of the firstname or the name and should change the state error', () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori&';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('error')).toEqual("Le nom et le prénom ne peuvent contenir que des lettres");
    });

    it('_submit failed because of the phone and should change the state error', () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014a";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('error')).toEqual("le téléphone ne peut contenir que des chiffres");
    });

    it('_submit failed because of the password security and should change the state error', () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd";
        let confirm = "Passw0rd";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('error')).toEqual("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
    });

    it('_submit failed because of the mail and should change the state error', () => {
        let mail = "this@is";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
        instance._submit();
        expect(wrap.state('error')).toEqual("l'email n'est pas valide");
        expect(axios.post).toHaveBeenCalledTimes(0);
    });

    it("_send() is ok with good parameter", () => {
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let confirm = "Passw0rd!&";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        wrap.setState({mailVerified : true})
        wrap.find("[testID='mailInscript']").at(0).simulate('changeText', mail);
        wrap.find("[testID='passwordInscript']").at(0).simulate('changeText', pwd);
        wrap.find("[testID='confirm']").at(0).simulate('changeText', confirm);
        wrap.find("[testID='phone']").at(0).simulate('changeText', phone);
        wrap.find("[testID='name']").at(0).simulate('changeText', name);
        wrap.find("[testID='firstname']").at(0).simulate('changeText', firstname);
        wrap.find("[testID='gender']").at(0).simulate('valueChange', gender);
    instance._send(wrap.state.firstname, wrap.state.name, wrap.state.phone, wrap.state.gender, wrap.state.mail, wrap.state.password)
    expect(axios.post).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    });

    it("navigate back to connexion ", () => {
        const wrap = shallow(<Inscription navigation={navigation}/>);
        const instance = wrap.instance();
        wrap.find("[testID='redirect']").simulate('press');
    });

    it("catch error on _send ", () => {
        axios.post.mockRejectedValue({
            response : {
                status : 403
            }
        });
        let mail = "this@is.mail";
        let pwd = "Passw0rd!";
        let phone = "0476090014";
        let name = 'Pastori';
        let firstname = 'Lucas';
        let gender = 'M';
        const wrap = shallow(<Inscription navigation={navigation}/>)
        const instance = wrap.instance();
        instance._send(firstname, name, phone, gender, mail, pwd)
        expect(axios.post).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });
});
