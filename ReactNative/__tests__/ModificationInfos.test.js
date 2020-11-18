import 'react-native';
import React from "react";
import ModificationInfos from "../Components/ModificationInfos";

describe("modificationInfos function Component", () => {

    const wrapper = shallow(ModificationInfos() );

    it('Returns faill message when nickname is empty', () => {

        wrapper.check()
        expect(message.message).toBe("Veuillez insérer un nom pour la porte.")
    })
}
