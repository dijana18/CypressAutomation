import { faker } from "@faker-js/faker";
const Locators = require("../fixtures/Locators.json");

describe("test register", () => {
  let registerData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  beforeEach('generate new fake data', () => {
    registerData.firstName = faker.name.firstName();
    registerData.lastName = faker.name.lastName();
    registerData.email = faker.internet.email();
    registerData.password = faker.internet.password();
  });

  it("register without first name", () => {
    console.log("sifra", registerData.password);
    cy.visit("/register");
    cy.url().should("include", "register");
    cy.get(Locators.Registration.lastNameInput).type(registerData.lastName);
    cy.get(Locators.Registration.emailInput).type(registerData.email);
    cy.get(Locators.Registration.passwordInput).type(registerData.password);
    cy.get(Locators.Registration.confirmedPasswordInput).type(registerData.password);
    cy.get(Locators.Registration.tacCheckbox).check();
    cy.get(Locators.Registration.submitBtn).click();
    cy.url().should("include", "/register");
  });

  it("register with valid data", () => {
    console.log("sifra", registerData.password);
    cy.visit("/register");
    cy.url().should("include", "register");
    cy.get(Locators.Registration.firstNameInput).type(registerData.firstName);
    cy.get(Locators.Registration.lastNameInput).type(registerData.lastName);
    cy.get(Locators.Registration.emailInput).type(registerData.email);
    cy.get(Locators.Registration.passwordInput).type(registerData.password);
    cy.get(Locators.Registration.confirmedPasswordInput).type( registerData.password);
    cy.get(Locators.Registration.tacCheckbox).check();
    cy.get(Locators.Registration.submitBtn).click();
    cy.url().should("not.include", "/register");
  });
});
