describe('login page', () =>{
    beforeEach(() =>{
        cy.fixture('NewDoor').as('mock');
        cy.server();
        cy.route('POST', 'newDoor', '@mock')
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
        cy.contains('1.2.3.4');
        cy.get('[data-testid="comfirmAddIp"]').click();

        cy.get('[data-testid="returnToMenu"]').click();
        cy.get('[data-testid="navigatorAdmin"]').click();
        cy.get('a[href="/Ajouter%20une%20porte"]').click();
        cy.get('[data-testid="id"]').type("169");
        cy.get('[data-testid="pswd"]').type("ADSggsetEZ");
        cy.get('[data-testid="button-verif"]').click();


        cy.get('[data-testid="name"]').type("coucou");
        cy.get('[data-testid="tag"]').type("tst");
        cy.get('[data-testid="button-ajout2"]').click();


        cy.get('[data-testid="navigatorAddDoor"]').click();
        cy.get('a[href="/Afficher%20la%20liste%20de%20vos%20portes"]').click();

        cy.contains('tst');
        cy.get('[data-testid="tst"]').click();
        cy.wait(2000);
        cy.contains('coucou');
        cy.get('[data-testid="coucou"]').click();


        cy.wait(2000);
        cy.get('[data-testid="dlt"]').click();
        cy.wait(2000);
        cy.get('[data-testid="confirmDlt"]').click();
    });


});
