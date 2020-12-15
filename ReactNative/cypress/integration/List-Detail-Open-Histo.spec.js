describe('login page', () =>{
    beforeEach(() =>{
        cy.visit("http://192.168.1.10:19006/");
    });

    it ("should do ListDoor-detailsDoor-Open/CloseDoor-Histo", () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail.com");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.get('[data-testid="connexion"]').click();
        cy.wait(2000);
        cy.get('[data-testid="maman"]').click();
        cy.wait(2000);
        cy.get('[data-testid="porte1"]').click();
        cy.wait(2000);
        cy.get('[data-testid="openDoor"]').click();
        cy.wait(2000);
        cy.get('[data-testid="openHisto"]').click();
        cy.wait(5000);
        cy.get('[data-testid="backingHisto"]').click();
        cy.reload();
    });

});
