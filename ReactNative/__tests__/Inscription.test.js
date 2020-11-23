import 'react-native';
import { _verify, _redirect} from '../Functions/functionsInscription'

it('Returns -true- and no error when everything is fine', () => {
    let answer = _verify("lucas","pastori","arle060620@gmail.com", "0476090014", "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe("");
});

it('Returns -false- and an error when password and confirm aren\'t the same', () => {
    let answer = _verify("lucas","pastori","arle060620@gmail.com", "0476090014", "Passw0rd!", "Passw0rd!1");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe et celui de confirmation doivent être identique");
});

it('Returns -false- and an error when the password is not valid', () => {
    let answer = _verify("lucas","pastori","arle060620@gmail.com", "0476090014", "Passw0rd", "Passw0rd");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
});

it('Returns -false- and an error when the mail is not valid', () => {
    let answer = _verify("lucas","pastori","lol", "0476090014", "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe('l\'email n\'est pas valide');
});

it('Returns -false- and an error when the firstname is not valid', () => {
    let answer = _verify("lucas1","pastori","arle060620@gmail.com", "0476090014", "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

it('Returns -false- and an error when the firstname and the lastname are not valid', () => {
    let answer = _verify("lucas1","pastori1","arle060620@gmail.com", "0476090014", "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

it('Returns -false- and an error when the lastname is not valid', () => {
    let answer = _verify("lucas","pastori1","arle060620@gmail.com", "0476090014", "Passw0rd!", "Passw0rd!");
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le nom et le prénom ne peuvent contenir que des lettres");
});

