import 'react-native';
import { _verifyname, _verifyconfirm, _verifyPassword, _verifyMail, _verifyPhone,  _redirect} from '../Functions/functionsInscription'


///////// FIRSTNAME AND LASTNAME VALIDATION ///////////////////////////////////////////////////////
it('Returns -true- and no error when everything is fine', () => {
    let answer = _verifyname("lucas","pastori");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe("");
});

it('Returns -false- and an error when the firstname is not valid', () => {
    let answer = _verifyname("lucas1","pastori");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

it("Returns -false- and an error when the lastname is not valid", () => {
    let answer = _verifyname("lucas","pastori1");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

it('Returns -false- and an error when the firstname and the lastname are not valid', () => {
    let answer = _verifyname("lucas1","pastori1");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

////////////////////////////// CONFIRM WITH PASSWORD COMPARAISON /////////////////////////////////////////////////

it('Returns -true- and no error when password and confirm are the same', () => {
    let answer = _verifyconfirm( "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe("");
});

it('Returns -false- and an error when password and confirm aren\'t the same', () => {
    let answer = _verifyconfirm("Passw0rd!", "Passw0rd!1");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe et celui de confirmation doivent être identique");
});


/////////////////////////////// PASSWORD VALIDATION /////////////////////////////////////////////////////////////

it('Returns -true- and no error when the password is valid', () => {
    let answer = _verifyPassword( "Passw0rd!");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe("");
});

it('Returns -false- and an error when the password is not valid (missing number)', () => {
    let answer = _verifyPassword("Password!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
});

it('Returns -false- and an error when the password is not valid (missing caps)', () => {
    let answer = _verifyPassword( "passw0rd!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
});

it('Returns -false- and an error when the password is not valid (missing lowercase)', () => {
    let answer = _verifyPassword("PASSW0RD!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
});

it('Returns -false- and an error when the password is not valid (missing special)', () => {
    let answer = _verifyPassword("Passw0rd");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
});

/////////////////////////////// EMAIL VALIDATION ////////////////////////////////////////////////////////////////

it('Returns -true- and no error when the mail is valid', () => {
    let answer = _verifyMail("lol@lol.be");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe('');
});

it('Returns -false- and an error when the mail is not valid (missing @)', () => {
    let answer = _verifyMail("lol.be");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe('l\'email n\'est pas valide');
});

it('Returns -false- and an error when the mail is not valid (missing .)', () => {
    let answer = _verifyMail("lol@lol");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe('l\'email n\'est pas valide');
});


////////////////////////////// PHONE VALIDATION ////////////////////////////////////////////////////////////////////

it('Returns -true- and no error when the phone is  valid', () => {
    let answer = _verifyPhone( "0476090014");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe('');
});

it('Returns -false- and an error when the phone is not valid', () => {
    let answer = _verifyPhone( "0476090014a");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe('le téléphone ne peut contenir que des chiffres');
});
