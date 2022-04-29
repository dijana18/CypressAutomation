import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {
  
    it("login with valid data", () => {
    cy.visit("/login");
    //loginPage.emailInput.type("dijana@gmail.com");
    //loginPage.passwordInput.type("12345678");
    //loginPage.submitBtn.click();
    loginPage.login('dijana@gmail.com','12345678');
  })
})
