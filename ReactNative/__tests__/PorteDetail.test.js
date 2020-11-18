import 'react-native';
import { getStatus, getDoorById, getTitle } from '../Functions/functionsPorteDetail'

it('Returns -Ouvert- when bool is true', () => {
    let receivedStatus = getStatus(true)
    expect(receivedStatus).toBe('Ouvert')
})

it('Returns -Fermé- when bool is false', () => {
    let receivedStatus = getStatus(false)
    expect(receivedStatus).toBe('Fermé')
})

it('Returns door data by id', () => {
    let dataDoor = [{"id":1,"password":"testing","status":1}]
    let receivedDoor = getDoorById(1, dataDoor)
    expect(receivedDoor).toMatchObject([1, "testing", 1])
})

it('Returns -Ouvrir- when status is null', () => {
    let status = 0;
    let receivedStatus = getTitle(status);
    expect(receivedStatus).toBe('Ouvrir')
})

it('Returns -Fermer- when status is 1', () => {
    let status = 1;
    let receivedStatus = getTitle(status);
    expect(receivedStatus).toBe('Fermer')
})