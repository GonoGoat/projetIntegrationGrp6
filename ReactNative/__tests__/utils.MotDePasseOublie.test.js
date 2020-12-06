import 'react-native';
import { checkmail} from '../Functions/functionsMotDePasseOublie'

/////////////////////////////// EMAIL VALIDATION ////////////////////////////////////////////////////////////////

it('Returns -true- and no error when the mail is valid', () => {
    let answer = checkmail("lol@lol.be");
    expect(answer.type).toBe('success');
    expect(answer.message).toBe('Votre mot de passe a été réinitialisé.');
});

it('Returns -false- and an error when the mail is not valid (missing @)', () => {
    let answer = checkmail("lol.be");
    expect(answer.type).toBe('fail');
    expect(answer.message).toBe('Veuillez insérer un e-mail valide.');
});

it('Returns -false- and an error when the mail is not valid (missing .)', () => {
    let answer = checkmail("lol@lol");
    expect(answer.type).toBe('fail');
    expect(answer.message).toBe('Veuillez insérer un e-mail valide.');
});
