import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AjoutPorte from "../Components/AjoutPorte";
import AjoutPorte_FormAjout from "../Components/AjoutPorte_FormAjout"
import AjoutPorte_FormVerif from "../Components/AjoutPorte_FormVerif"

Enzyme.configure({ adapter: new Adapter() });

describe ("AjoutPorte Component" , () => {
    it('renders without crashing', () => {
        shallow(<AjoutPorte/>)
    });

    it('should by default render verification form', () => {
        const wrap = shallow(<AjoutPorte/>)
        expect(wrap.containsMatchingElement(<AjoutPorte_FormVerif/>)).toBeTruthy();
        expect(wrap.containsMatchingElement(<AjoutPorte_FormAjout/>)).toBeFalsy();
    });
});

describe ("AjoutPorte Component - Verification Form" , () => {
    it('renders without crashing', () => {
        shallow(<AjoutPorte_FormVerif/>)
    });

    it('should have empty fields by default', () => {
        const wrap = shallow(<AjoutPorte_FormVerif/>)
        expect(wrap.find("[testID='id']").text).toEqual("1");
        expect(wrap.find("[testID='pswd']").get(0).value).toEqual("test");
    });

    it('should update text input value on change', () => {
        let id = 1
        let pswd = "abcdefghij"
        const wrap = shallow(<AjoutPorte_FormVerif/>)
        wrap.find("[testID='id']").simulate('change', {
            target: { value: id }
        })
        wrap.find("[testID='pswd']").simulate('change', {
            target: { value: pswd }
        })
        expect(wrap.find("[testID='id']").get(0).value).toBe(id);
        expect(wrap.find("[testID='pswd']").get(0).value).toBe(pswd);
    });
});

describe ("AjoutPorte Component - Adding form" , () => {
    it('renders without crashing', () => {
        shallow(<AjoutPorte_FormAjout/>);
    });

    it('should by default render verification form', () => {
        const wrap = shallow(<AjoutPorte_FormAjout/>);
    });
});
