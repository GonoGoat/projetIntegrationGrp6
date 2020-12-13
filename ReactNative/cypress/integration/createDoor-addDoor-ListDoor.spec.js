describe('login page', () =>{
    beforeEach(() =>{
        cy.visit("http://192.168.1.10:19006/");
    });

    it ("should do createDoor-addDoor-ListDoor", () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail.com");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.get('[data-testid="connexion"]').click();
        cy.get('[data-testid="navigatorDoorList"]').click();
        cy.get('a[href="/Admin"]').click();
        cy.get('[data-testid="adminIp"]').click();
        cy.get('[data-testid="adminIp"]').type('1.2.3.4');
        cy.get('[data-testid="button-ajout"]').click();
        cy.get('[data-testid="comfirmAddIp"]').click();
        cy.get('[data-testid="returnToMenu"]').click();
    });

});
