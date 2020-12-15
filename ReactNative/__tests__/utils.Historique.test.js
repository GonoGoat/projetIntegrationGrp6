import 'react-native';
import { getDateFormat, getNomPrenom, getStyleByIntex, getActionStyle, getActionString, getStyleInfosGauche} from '../Functions/functionsHistorique'

describe("Date format", () => {
  it('Send correct date format', () => {
    let sendedDate = '2000-01-01T00:00:00.000Z';
    let receivedDate = getDateFormat(sendedDate)
    expect(receivedDate).toBe('01/01/2000 1:00')
  });
  
  it('Send correct date format at 23h', () => {
    let sendedDate = '2000-01-01T23:00:00.000Z';
    let receivedDate = getDateFormat(sendedDate)
    expect(receivedDate).toBe('01/01/2000 00:00')
  });
});

it('Returns correct name format', () => {
  let id = 1;
  let table = [{"id":1,"firstname":"testingFirstname","lastname":"testingLastname","phone":null,"sexe":"M","mail":"testing@testing.testing","password":"testing"}]
  let receivedName = getNomPrenom(id, table)
  expect(receivedName).toBe('testingLastname testingFirstname')
})

it('Returns correct style by pair Index', () => {
  let index = 0
  let receivedStyle = getStyleByIntex(index)
  expect(receivedStyle).toMatchObject({
    backgroundColor: '#719ada',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  })
})

it('Returns correct style by unpair Index', () => {
  let index = 1
  let receivedStyle = getStyleByIntex(index)
  expect(receivedStyle).toMatchObject({
    backgroundColor: '#d0d0d0',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  })
})

it('Returns correct style for pair action', () => {
  let index = 0
  let receivedStyle = getActionStyle(index)
  expect(receivedStyle).toMatchObject({
    position: "absolute",
    color: "white",
    top: 15,
    right: 10,
    fontSize: 20
  })
})

it('Returns correct style for unpair action', () => {
  let index = 1
  let receivedStyle = getActionStyle(index)
  expect(receivedStyle).toMatchObject({
    position: "absolute",
    color: "black",
    top: 15,
    right: 10,
    fontSize: 20
  })
})

it('Returns -Fermeture- for pair action', () => {
  let action = 0
  let receivedStyle = getActionString(action)
  expect(receivedStyle).toBe('Fermeture')
})

it('Returns -Ouverture- for unpair action', () => {
  let action = 1
  let receivedStyle = getActionString(action)
  expect(receivedStyle).toBe('Ouverture')
})

it('Returns -InfoImpair- for unpair action', () => {
  let action = 1
  let receivedStyle = getStyleInfosGauche(action)
  expect(receivedStyle).toMatchObject({
    color: "black",
    fontSize: 15
  })
})

it('Returns -InfoPair- for pair action', () => {
  let action = 0
  let receivedStyle = getStyleInfosGauche(action)
  expect(receivedStyle).toMatchObject({
    color: "white",
    fontSize: 15
  })
})