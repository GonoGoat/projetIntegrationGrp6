import React, { Component } from "react";
import listePortes from "../Components/listePortes"
import {_loadTag, _loadDoor}  from '../Components/listePortes'

/* describe("listePortes Class Component", () => {
    it("should call _storedata", () => {
      const wrapper = shallow(<listePortes />);
      expect(wrapper.length).toBe(1);
    })
}) */

it('return correct tags by user', () => {
    let tag = [{"tag":"maman"},{"tag":"test"}];
    let ListeTag = _loadTag()
    expect(ListeTag).toBe(tag)
})

it('return correct doors by tag', () => {
    let door = [{"door":1,"users":1,"tag":"maman","nickname":"porte1"},{"door":1,"users":8,"tag":"maman","nickname":"porte1"}];
    let ListeDoor = _loadDoor()
    expect(ListeDoor).toBe(tag)
})
