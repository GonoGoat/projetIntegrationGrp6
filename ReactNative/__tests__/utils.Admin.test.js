const fcts = require("../Functions/functionsAdmin");

describe ("checkIpfunction" , () => {
    it('fails if empty', () => {
        let test = []
        test.push(fcts.checkIp(""));
        test.push(fcts.checkIp(undefined));
        test.push(fcts.checkIp(null));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
        expect(test[0].message).toEqual(test[1].message)
        expect(test[0].message).toEqual(test[2].message)
    });

    it('fails if it isn\'t an IPv4 address', () => {
        let test = []
        test.push(fcts.checkIp("oui"));
        test.push(fcts.checkIp(1));
        test.push(fcts.checkIp("test123"));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeTruthy();
            expect(test[i].type === "fail").toBeTruthy();
        }
        expect(test[0].message).toEqual(test[1].message)
        expect(test[0].message).toEqual(test[2].message)
    });

    it('works if the input is correct', () => {
        let test = []
        test.push(fcts.checkIp("1.1.1.1"));
        test.push(fcts.checkIp("192.168.10.1"));
        test.push(fcts.checkIp("10.1.1.1"));

        for (let i = 0; i<test.length;i++) {
            expect(test[i].hasOwnProperty("type")).toBeFalsy();
            expect(test[i]).toEqual(true);
        }
    });
});


describe ("error function" , () => {
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
        
        let test = fcts.error(erreur);
        let test2 = fcts.error(erreur2);
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
        
        let test = fcts.error(erreur);
        let test2 = fcts.error(erreur2);
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
        let test = fcts.error(erreur);
        let test2 = fcts.error(erreur2);
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
        let test = fcts.error(erreur);
        let test2 = fcts.error(erreur2);
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