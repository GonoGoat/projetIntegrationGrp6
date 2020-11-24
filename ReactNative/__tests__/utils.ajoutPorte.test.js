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

describe ("checkAjoutAPI function" , () => {
    it('fails if the type is set at "true" but the data isn\'t correct', () => {
        let badAdd = {
            data : false
        };
        let otherBadAdd = {
            data : false,
            otherData : true
        }
        let test = fcts.checkAjoutAPI(badAdd,true);
        let test2 = fcts.checkAjoutAPI(otherBadAdd,true)

        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test2.type).toEqual(test.type);
        expect(test2.message).toEqual(test.message);
    })
    it('works if the type is set at "true" and the data is correct', () => {
        let good ={
            data : true,
        };
        let alsoGood = {
            data : true,
            otherData : false
        }
        let test = fcts.checkAjoutAPI(good,true);
        let test2 = fcts.checkAjoutAPI(alsoGood,true)

        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeFalsy();
        expect(test2.type).toEqual(test.type);
        expect(test2.message).toEqual(test.message);
    })
})

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

    it('fails if the type is set at "false" because of an invalid information', () => {
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
        let idText = "ID";
        let mdpText = "Mot de passe";

        test = fcts.checkVerifAPI(badPassword,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(mdpText);
        expect(test.message).not.toContain(idText);

        test = fcts.checkVerifAPI(invalidId,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test.message).toContain(idText);
        expect(test.message).not.toContain(mdpText);

    })

    it('works if the type is set at "true" and the data is correct', () => {
        let test = [];
        let good ={
            data : true,
        };
        let alsoGood = {
            data : true,
            otherData : false
        }
        test.push(fcts.checkVerifAPI(good,true));
        test.push(fcts.checkVerifAPI(alsoGood,true))

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeFalsy();
            expect(test[i] === true).toBeTruthy();
        }
    });
});

describe ("common errors of checkVerifAPI and checkAjoutAPI functions" , () => {
    var client = "client";
    var serveur = "serveur";
    var error = "erreur";
    var envoi = "envoi"
    it('returns an specific message if a 4xx error has been sent by the server (other than 403 and 404 for checkVerifAPI)', () => {
        let erreur = {
            response : {
                status : 401
            }
        };
        let erreur2 = {
            response : {
                status : 402
            }
        };
        
        let test = fcts.checkAjoutAPI(erreur,false);
        let test2 = fcts.checkVerifAPI(erreur2,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test2.type).toEqual(test.type);

        expect(test.message.toLowerCase()).toContain(error);
        expect(test.message.toLowerCase()).toContain(client);
        expect(test.message.toLowerCase()).not.toContain(serveur);
        expect(test.message.toLowerCase()).not.toContain(envoi);
        expect(test2.message).toEqual(test.message);
    })
    it('returns an specific message if a 5xx error has been sent by the server', () => {
        let erreur = {
            response : {
                status : 502
            }
        };
        let erreur2 = {
            response : {
                status : 503
            }
        };
        
        let test = fcts.checkAjoutAPI(erreur,false);
        let test2 = fcts.checkVerifAPI(erreur2,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test2.type).toEqual(test.type);

        expect(test.message.toLowerCase()).toContain(error);
        expect(test.message.toLowerCase()).not.toContain(client);
        expect(test.message.toLowerCase()).not.toContain(envoi);
        expect(test.message.toLowerCase()).toContain(serveur);
        expect(test2.message).toEqual(test.message);
    });

    it('returns an specific message if the request couldn\t be sent', () => {
        let erreur = {
            request : {
                test : "test"
            }
        };
        let erreur2 = {
            request : {
                oui : "oui"
            }
        };
        let test = fcts.checkAjoutAPI(erreur,false);
        let test2 = fcts.checkVerifAPI(erreur2,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test2.type).toEqual(test.type);

        expect(test.message.toLowerCase()).toContain(error);
        expect(test.message.toLowerCase()).not.toContain(client);
        expect(test.message.toLowerCase()).not.toContain(serveur);
        expect(test.message.toLowerCase()).toContain(envoi);
        expect(test2.message).toEqual(test.message);
    });

    it('returns an specific message if the server answered with an unknown status or if the error is unknown', () => {
        let erreur = {
            reponse : {
                status : 313
            }
        };
        let erreur2 = {
            test : "test"
        };
        let test = fcts.checkAjoutAPI(erreur,false);
        let test2 = fcts.checkVerifAPI(erreur2,false);
        expect(test.hasOwnProperty("type")).toBeTruthy();
        expect(test2.hasOwnProperty("type")).toBeTruthy();
        expect(test.type === "fail").toBeTruthy();
        expect(test2.type).toEqual(test.type);

        expect(test.message.toLowerCase()).toContain(error);
        expect(test.message.toLowerCase()).not.toContain(client);
        expect(test.message.toLowerCase()).not.toContain(serveur);
        expect(test.message.toLowerCase()).not.toContain(envoi);
        expect(test2.message).toEqual(test.message);
    });
})