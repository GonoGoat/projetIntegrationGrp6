import Connection from "../Components/Connection";

test('update props mail', () => {
  let string = "mail_example";
  expectToBeCalledOnce(Connection._mailChanged())
});
