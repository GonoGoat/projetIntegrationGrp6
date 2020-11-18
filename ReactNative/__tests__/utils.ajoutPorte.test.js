const fcts = require("../utils/ajoutPorte")

describe ("checkVerif function" , () => {
    it('fails with at least one empty fields', () => {
        let test = [];
        test.push(fcts.checkVerif('',''));
        test.push(fcts.checkVerif(1,''));
        test.push(fcts.checkVerif('','test'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if id isn\'t a number', () => {
        let test = [];
        test.push(fcts.checkVerif('test','abcdefghij'));
        test.push(fcts.checkVerif('test123','abcdefghij'));
        test.push(fcts.checkVerif('?!]".','abcdefghij'));
        test.push(fcts.checkVerif('?!]".efg','abcdefghij'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if password isn\'t 10 characters-only long', () => {
        let test = [];
        test.push(fcts.checkVerif(1,'1234567890'));
        test.push(fcts.checkVerif(1,'test123456'));
        test.push(fcts.checkVerif(1,'?!?!?!?!?!'));
        test.push(fcts.checkVerif(1,'test?!?!?!'));

        test.push(fcts.checkVerif(1,'testTeste'));
        test.push(fcts.checkVerif(1,'12345'));
        test.push(fcts.checkVerif(1,'te123'));
        test.push(fcts.checkVerif(1,'?!'));
        test.push(fcts.checkVerif(1,'??!!tEst'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('works if it respects the constraints', () => {
        let test = [];
        test.push(fcts.checkVerif(1,'testtestee'));
        test.push(fcts.checkVerif(1,'HELLOWORLD'));

        test.push(fcts.checkVerif(1,'testeTestE'));
        test.push(fcts.checkVerif(1,'HELLOworld'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeFalsy();
            expect(test[i] === true).toBeTruthy();
        }
    });
});

describe ("checkAjout function" , () => {
    it('fails with at least one empty fields', () => {
        let test = [];
        test.push(fcts.checkAjout('',''));
        test.push(fcts.checkAjout('test',''));
        test.push(fcts.checkAjout('','test'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if tag isn\'t a string', () => {
        let test = [];
        test.push(fcts.checkAjout('123456','Abcdef'));
        test.push(fcts.checkAjout('test123','Abcdef'));
        test.push(fcts.checkAjout('?!]".','Abcdef'));
        test.push(fcts.checkAjout('?!]".efg','Abcdef'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('fails if password isn\'t a string', () => {
        let test = [];
        test.push(fcts.checkAjout('Test','123456'));
        test.push(fcts.checkAjout('Test','test123'));
        test.push(fcts.checkAjout('Test','?!]".'));
        test.push(fcts.checkAjout('Test','?!]".efg'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
    });

    it('works if it respects the constraints', () => {
        let test = [];
        test.push(fcts.checkAjout('HELLOWORLD','testtestee'));
        test.push(fcts.checkAjout('testtestee','HELLOWORLD'));

        test.push(fcts.checkAjout('HELLOworld','testeTestE'));
        test.push(fcts.checkAjout('testeTestE','HELLOworld'));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeFalsy();
            expect(test[i] === true).toBeTruthy();
        }
    });
});