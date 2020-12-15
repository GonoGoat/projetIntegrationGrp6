describe('login page', () =>{
    beforeEach(() =>{
        cy.visit("http://192.168.1.10:19006/");
        cy.wait(1000);
    });

    it ("should do register-login-modify account", () => {
        cy.get('[data-testid="inscription"]').click();
        cy.contains(/nom/i);
        cy.contains(/Prénom/i);
        cy.contains(/téléphone/i);
        cy.contains(/e-mail/i);
        cy.contains(/mot de passe/i);
        cy.contains(/Confirmation/i);
        cy.contains(/sexe/i);
        cy.get('[data-testid="name"]').type("Pastori1");
        cy.get('[data-testid="submit"]').click();
        cy.contains("Le nom et le prénom ne peuvent contenir que des lettres");
        cy.wait(2000);
        cy.get('[data-testid="name"]').clear();
        cy.get('[data-testid="name"]').type("Pastori");
        cy.get('[data-testid="firstname"]').type("Lucas");
        cy.get('[data-testid="phone"]').type("0476090014");
        cy.get('[data-testid="gender"]').select('M');
        cy.get('[data-testid="mailInscript"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="passwordInscript"]').type("Passw0rd!");
        cy.get('[data-testid="confirm"]').type("Passw0rd!");
        cy.wait(2000);
        cy.get('[data-testid="submit"]').click();
        cy.get('[data-testid="mail"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.wait(2000);
        cy.get('[data-testid="connexion"]').click();
        cy.wait(2000);
        cy.get('[data-testid="navigatorDoorList"]').click();
        cy.wait(2000);
        cy.get('a[href="/Mon%20compte"]').click();
        cy.wait(2000);
        cy.get('[data-testid="modifAccount"]').click();
        cy.get('[data-testid="modifName"]').click();
        cy.get('[data-testid="modifName"]').clear();
        cy.wait(2000);
        let nvnom = '';
        let alphabet = ['a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n'];
        for (let i = 0 ; i < 10 ; i++) {
            nvnom += alphabet[Math.round(Math.random()*27)]
        }
        cy.get('[data-testid="modifName"]').type(nvnom);
        cy.wait(2000);
        cy.get('[data-testid="confirmModifAccount"]').click();
        cy.get('[data-testid="confirmModifAccount"]').click();
        cy.wait(2000);
        cy.get('[data-testid="deleteAccount"]').click();
        cy.wait(2000);
        cy.get('[data-testid="confirmDeleteAccount"]').click();
        cy.wait(2000);
        cy.get('[data-testid="mail"]').type("arle060620@gmail.poland");
        cy.get('[data-testid="password"]').type("Passw0rd!");
        cy.wait(2000);
        cy.get('[data-testid="connexion"]').click();
    });


});
