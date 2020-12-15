import 'react-native';
import {verify} from '../Functions/functionsConnection';

it ('Should return state true and empty message', () => {
    let answer = verify('test@test.test', 'Test123!');
    expect(answer.state).toBe(true);
    expect(answer.msg).toBe("");
});

it ('Should return state false and empty message', () => {
    let answer = verify('test@test.test', 'Test');
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("Le mot de passe ne répond pas aux contraintes de l'inscription");
});


it ('Should return state false and empty message', () => {
    let answer = verify('Test', 'Test123!');
    expect(answer.state).toBe(false);
    expect(answer.msg).toBe("L'email n'est pas valide");
});
