import React from "react"
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Error from "../Components/Error"

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe ("Error Component" , () => {
    it('renders without crashing', () => {
        const wrap = shallow(<Error/>);
        expect(wrap.exists()).toBe(true);
    });

    it('should redirect to connexion page on click of the button', () => {
        const mockRedirect = jest.fn();
        navigation = {
            navigate : mockRedirect
        }
        const wrap = shallow(<Error navigation={navigation}/>);
        wrap.find("[testID='redirect']").simulate('press');
        expect(mockRedirect).toHaveBeenCalledTimes(1);
        expect(mockRedirect).toHaveBeenCalledWith('Connexion');
    });

});