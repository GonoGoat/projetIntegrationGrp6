const ModificationInfos = require("../Functions/functionsModificationInfos");

describe ("It test the checkValue function" , () => {

    it('works if value respects the constraints', () => {
        let testMessageErreur = [];
        testMessageErreur.push(ModificationInfos.checkValue('tagname'));
        testMessageErreur.push(ModificationInfos.checkValue('nickname1234'));
        testMessageErreur.push(ModificationInfos.checkValue('Nickname'));
        testMessageErreur.push(ModificationInfos.checkValue('Nickname1234'));
        testMessageErreur.push(ModificationInfos.checkValue('1234'));
        for (let i = 0; i<testMessageErreur.length;i++) {
            expect(testMessageErreur[i].hasOwnProperty("type")).toBeFalsy();
            expect(testMessageErreur[i] === true).toBeTruthy();
        }
    });

});

describe ("It test the check function" , () => {

    it('works if nickname and tagName respects the constraints', () => {
        let testMessageErreur = [];
        testMessageErreur.push(ModificationInfos.check('nickname','tagname'));
        testMessageErreur.push(ModificationInfos.check('nickname1234','tagname'));
        testMessageErreur.push(ModificationInfos.check('nickname','tagname1234'));
        testMessageErreur.push(ModificationInfos.check('nickname1234','tagname1234'));
        testMessageErreur.push(ModificationInfos.check('Nickname','tagname'));
        testMessageErreur.push(ModificationInfos.check('Nickname1234','tagname'));
        testMessageErreur.push(ModificationInfos.check('Nickname1234','tagname12345'));
        testMessageErreur.push(ModificationInfos.check('Nickname','Tagname'));
        testMessageErreur.push(ModificationInfos.check('Nickname123','Tagname'));
        testMessageErreur.push(ModificationInfos.check('Nickname123','Tagname123'));
        testMessageErreur.push(ModificationInfos.check('1234','Tagname1234'));
        testMessageErreur.push(ModificationInfos.check('1234','1234'));
        for (let i = 0; i<testMessageErreur.length;i++) {
            expect(testMessageErreur[i].hasOwnProperty("type")).toBeFalsy();
            expect(testMessageErreur[i] === true).toBeTruthy();
        }
    });

    it('fails with at least one empty fields', () => {
        let testMessageErreur = [];
        testMessageErreur.push(ModificationInfos.check('',''));
        testMessageErreur.push(ModificationInfos.check('nickname',''));
        testMessageErreur.push(ModificationInfos.check('','tagName'));

        for (let i = 0; i<testMessageErreur.length;i++) {
            expect(testMessageErreur[i].hasOwnProperty("message")).toBeTruthy();
            expect(testMessageErreur[i].hasOwnProperty("type")).toBeTruthy();
            expect(testMessageErreur[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if nickname isn\'t a letter or number ' , () => {
        let testMessageErreur = [];
        testMessageErreur.push(ModificationInfos.check('nickname','tagName'));
        testMessageErreur.push(ModificationInfos.check('nickname1234','tagName'));
        testMessageErreur.push(ModificationInfos.check('@&(-','tagName'));

        for (let i = 0; i<testMessageErreur.length;i++) {
            expect(testMessageErreur[i].hasOwnProperty("message")).toBeTruthy();
            expect(testMessageErreur[i].hasOwnProperty("type")).toBeTruthy();
            expect(testMessageErreur[i].type === "fail").toBeTruthy();
        }
    });


    it('fails if tagName isn\'t a letter or number ' , () => {
        let testMessageErreur = [];
        testMessageErreur.push(ModificationInfos.check('nickname','tagName123'));
        testMessageErreur.push(ModificationInfos.check('nickname123','tagName'));
        testMessageErreur.push(ModificationInfos.check('@&(-','tagName'));
        testMessageErreur.push(ModificationInfos.check('@&(-','@&(-'));

        for (let i = 0; i<testMessageErreur.length;i++) {
            expect(testMessageErreur[i].hasOwnProperty("message")).toBeTruthy();
            expect(testMessageErreur[i].hasOwnProperty("type")).toBeTruthy();
            expect(testMessageErreur[i].type === "fail").toBeTruthy();
        }
    });

});
