const fcts = require("../Functions/functionsAdmin");

describe ("checkVerif function" , () => {
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
    })
})