const ModificationInfos = require("../Functions/functionsModificationInfos");

describe ("check function" , () => {
    it('works if nickname and tagName respects the constraints', () => {
        let test = [];
        test.push(ModificationInfos.check('nickname','tagname'));
        test.push(ModificationInfos.check('nickname1234','tagname'));
        test.push(ModificationInfos.check('nickname','tagname1234'));
        test.push(ModificationInfos.check('nickname1234','tagname1234'));
        test.push(ModificationInfos.check('Nickname','tagname'));
        test.push(ModificationInfos.check('Nickname1234','tagname'));
        test.push(ModificationInfos.check('Nickname1234','tagname12345'));
        test.push(ModificationInfos.check('Nickname','Tagname'));
        test.push(ModificationInfos.check('Nickname123','Tagname'));
        test.push(ModificationInfos.check('Nickname123','Tagname123'));
        test.push(ModificationInfos.check('1234','Tagname1234'));
        test.push(ModificationInfos.check('1234','1234'));
        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails with at least one empty fields', () => {
        let test = [];
        test.push(ModificationInfos.check('',''));
        test.push(ModificationInfos.check('nickname',''));
        test.push(ModificationInfos.check('','tagName'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if nickname isn\'t a letter or number ' , () => {
        let test = [];
        test.push(ModificationInfos.check('nickname','tagName'));
        test.push(ModificationInfos.check('nickname1234','tagName'));
        test.push(ModificationInfos.check('@&(-','tagName'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if tagName isn\'t a letter or number ' , () => {
        let test = [];
        test.push(ModificationInfos.check('nickname','tagName123'));
        test.push(ModificationInfos.check('nickname123','tagName'));
        test.push(ModificationInfos.check('@&(-','tagName'));
        test.push(ModificationInfos.check('@&(-','@&(-'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

});