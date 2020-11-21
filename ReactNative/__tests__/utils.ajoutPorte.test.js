//npm test -- utils.ajoutPorte.test.js
const fcts = require("../Functions/functionsAjoutPorte")

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

describe ("checkVerifAPI function" , () => {
    it('fails if the type is set at "true" but the data isn\'t correct', () => {
        let isExisting = {
            data : false
        };
        let badAnswer = {
            data : 0
        };
        let test;
        let invalidText = "Vous avez déjà cette porte";
        let problemText = "Votre requête a abouti";

        test = fcts.checkVerifAPI(isExisting,true);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(invalidText);
        expect(test.message).not.toContain(problemText);

        test = fcts.checkVerifAPI(badAnswer,true);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(problemText);
        expect(test.message).not.toContain(invalidText);

    })
    it('fails if the type is set at "false"', () => {
        let badPassword = {
            response : {
                status : 403
            }
        };
        let invalidId = {
            response : {
                status : 404
            }
        };
        let serverBroken = {
            response : {
                status : 500
            }
        };
        let badGateway = {
            response : {
                status : 502
            }
        };
        let badRequest = {
            request : {
                test : "test"
            }
        }
        let error = {
            test : "test"
        }
        let idText = "ID"
        let mdpText = "Mot de passe"
        let erreur = "erreur"
        let req = "envoi"

        test = fcts.checkVerifAPI(badPassword,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(mdpText);
        expect(test.message).not.toContain(idText);
        expect(test.message).not.toContain(erreur);

        test = fcts.checkVerifAPI(invalidId,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(idText);
        expect(test.message).not.toContain(mdpText);
        expect(test.message).not.toContain(erreur);

        test = fcts.checkVerifAPI(serverBroken,false);
        let test2 = fcts.checkVerifAPI(badGateway,false);

        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(erreur);
        expect(test.message).not.toContain(mdpText);
        expect(test.message).not.toContain(idText);

        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test2.type === "fail").toBeTruthy();
        expect(test2.message).toContain(erreur);
        expect(test2.message).not.toContain(mdpText);
        expect(test2.message).not.toContain(idText);

        expect(test.message).toEqual(test2.message);

        test = fcts.checkVerifAPI(badRequest,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(req);
        expect(test.message).toContain(erreur);
        expect(test.message).not.toContain(idText);
        expect(test.message).not.toContain(mdpText);

        test = fcts.checkVerifAPI(error,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(erreur);
        expect(test.message).not.toContain(idText);
        expect(test.message).not.toContain(mdpText);

        expect(test.message).toEqual(test2.message);
    })

    it('works if the type is set at "true" and the data is correct', () => {
        let test = [];
        let good ={
            data : true,
        };
        let alsoGood = {
            data : true,
            otherData : true
        }
        test.push(fcts.checkVerifAPI(good,true));
        test.push(fcts.checkVerifAPI(alsoGood,true))

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeFalsy();
            expect(test[i] === true).toBeTruthy();
        }
    });
});