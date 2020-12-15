import React from "react"
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Historique from '../Components/Historique';

import axios from 'axios';
import { FlatList } from "react-native";

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe('Historique', () => {
    it('should render without crashing when histo not empty', () => {
        axios.get.mockResolvedValue({
            data : [{"id":1,"door":1,"users":1,"date":"2020-12-11T17:21:47.240Z","action":0}]
        })
        const props = {navigation: { navigate: jest.fn()}};
        let route = {params: {doorIdParam: 1, nickname:"Testing"}}
        wrap = shallow(<Historique route={route} props={props}/>)
        wrap.setState({isLoading: false, histo: ""})
        expect(wrap.exists()).toBe(true);
    })

    it('should render without crashing when histo empty', () => {
        let route = {params: {doorIdParam: 1, nickname:"Testing"}}
        wrap = shallow(<Historique route={route}/>)
        wrap.setState({isLoading: false, histo: ""})
        expect(wrap.exists()).toBe(true);
    })

    it('should error at axios.get', () => {
        axios.get.mockRejectedValue({
            response : {
                status : 403
            }
        })
        let route = {params: {doorIdParam: 1, nickname:"Testing"}}
        wrap = shallow(<Historique route={route}/>)
        setTimeout(function(){ expect(wrap.state().errorVisible).toEqual(true);}, 100);
    })
})