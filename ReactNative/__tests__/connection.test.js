import React from 'react';
import renderer from 'react-test-renderer';
import Connection from "../Components/Connection";

test('update props mail', () => {
  const myTest = Connection.test('string')
  expect(test).toHaveBeenCalled();
  const tree = renderer.create(<Connection />).toJSON();
  let string = "mail_example";
  tree._setMail(string);
  expect(Connection.mail).toBe("mail_example");
});
