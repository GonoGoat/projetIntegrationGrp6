import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Historique from '../Components/Historique'

Enzyme.configure({ adapter: new Adapter() });
let param = {params: {doorIdParam: 1, nickname: "Testing"}}

beforeEach(() => {
  jest.useFakeTimers();
});

describe('Historique', () => {
  it('From 1 to Ouverture', () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getActionString(1)).toBe("Ouverture");
  })
  it('From 0 to Fermeture', () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getActionString(0)).toBe("Fermeture");
  })
  it('Send correct date format', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getDateFormat('2020-11-12T09:05:26.586Z')).toBe('12/11/2020 09:05');
  });
  it('Gives correct name', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    wrapper.setState({users:[{"id":1,"firstname":"testingFirstname","lastname":"testingLastname","phone":"testing","sexe":"testing","mail":"testing.testing@testing.testing","password":"testing"}]}); 
    const componentInstance = wrapper.instance();
    expect(componentInstance.getNomPrenom(1)).toBe('testingLastname testingFirstname');
  });
  it('Send correct index style pair', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getStyleByIntex(0)).toMatchObject({
      backgroundColor: '#719ada',
      marginLeft: 15,
      marginRight: 15,
      paddingLeft: 15,
      paddingVertical: 10});
  });
  it('Send correct index style unpair', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getStyleByIntex(1)).toMatchObject({
      backgroundColor: '#d0d0d0',
      marginLeft: 15,
      marginRight: 15,
      paddingLeft: 15,
      paddingVertical: 10});
  });
  it('Send correct action style pair', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getActionStyle(0)).toMatchObject({
      position: "absolute",
      color: "white",
      top: 15,
      right: 10,
      fontSize: 20
    });
  });
  it('Send correct action style unpair', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    expect(componentInstance.getActionStyle(1)).toMatchObject({
      position: "absolute",
      color: "black",
      top: 15,
      right: 10,
      fontSize: 20
    });
  })
  it('Renders when loaded and histo empty', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    wrapper.setState({isLoading: false});
    expect(componentInstance.render()).not.toBe('<Text>Loading...</Text>');
  })
  it('Renders when loaded and histo not empty', async () => {
    const wrapper = shallow(<Historique route={param}/>);
    const componentInstance = wrapper.instance();
    wrapper.setState({isLoading: false, histo: [{"id":1,"door":1,"users":1,"date":"2000-01-01T00:00:00.693Z","action":1}]});
    expect(componentInstance.render()).not.toBe('<Text>Loading...</Text>');
  })
});
