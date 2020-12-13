describe('login page', () =>{
    beforeEach(() =>{
        cy.visit("http://192.168.1.10:19006/");
    });

    /*it('loads the login page', () => {
        cy.contains(/E-mail/i);
        cy.contains(/Mot de passe/i);
        cy.contains(/Mot de passe oublié/i);
    });

    it ('try to login with a bad e-mail', () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.get('[data-testid="connexion"]').click();
        cy.contains(/L'email n'est pas valide/);
    });

    it ("try to login with a e-mail that doesn t exist", () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.get('[data-testid="connexion"]').click();
        cy.contains(/Cette adresse mail n'existe pas encore. Veuillez vous inscrire./);
    });

    it ("try to login with a bad password", () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail.com");
        cy.get('[data-testid="password"]').type("Passw0rd");
        cy.get('[data-testid="connexion"]').click();
        cy.contains(/Le mot de passe ne répond pas aux contraintes de l'inscription./);
    });

    it ("try to login with a incorect password", () => {
        cy.get('[data-testid="mail"]').type("arle060620@gmail.com");
        cy.get('[data-testid="password"]').type("Passw0rd!!");
        cy.get('[data-testid="connexion"]').click();
        cy.contains(/Mot de passe incorrect. Veuillez réessayer./);
    });

    it ("goes to 'mot de pass oublié'", () => {
        cy.get('[data-testid="forgot"]').click();
    });
    */
    it ("should do register-login-modify account", () => {
        cy.get('[data-testid="inscription"]').click();
        cy.get('[data-testid="inscription"]').click();
        cy.contains(/nom/i);
        cy.contains(/Prénom/i);
        cy.contains(/téléphone/i);
        cy.contains(/e-mail/i);
        cy.contains(/mot de passe/i);
        cy.contains(/Confirmation/i);
        cy.contains(/sexe/i);
        cy.get('[data-testid="name"]').type("Pastori");
        cy.get('[data-testid="firstname"]').type("Lucas");
        cy.get('[data-testid="phone"]').type("0476090014");
        cy.get('[data-testid="gender"]').select('M');
        cy.get('[data-testid="mailInscript"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="passwordInscript"]').type("Passw0rd!");
        cy.get('[data-testid="confirm"]').type("Passw0rd!");
        cy.get('[data-testid="redirect"]').click();
        cy.get('[data-testid="mail"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.get('[data-testid="connexion"]').click();
        cy.get('[data-testid="connexion"]').click();
        cy.get('[data-testid="navigatorDoorList"]').click();
        cy.get("a[href=\"/Mon%20compte\"]").click();
    });

});
