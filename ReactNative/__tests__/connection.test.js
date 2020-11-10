import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Connection from '../Components/Connection';

Enzyme.configure({ adapter: new Adapter() });

describe("Connection Class Component", () => {
  it("should call _storedata", () => {
    const wrapper = shallow(<Connection />);
    expect(wrapper.length).toBe(1);
  });
});