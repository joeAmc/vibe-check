import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import "@testing-library/jest-dom";
import Auth from "../Auth";
import { setupServer } from "msw/node";
import { handlers } from "../../Mocks/handlers";
import "whatwg-fetch";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Auth page", () => {
  it("blocks log in if user doesn't exist", async () => {
    const contextValue = {
      loggedIn: false,
      showAlert: true,
      setShowAlert: jest.fn(),
      setLoggedIn: jest.fn(),
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    const submitButton = screen.getByRole("button", { name: "Log in" });
    fireEvent.click(submitButton);

    // assert log in success and redirected to vibe choice page
    const vibeChoiceHeader = await screen.findByText("Vibe Choice");
    expect(vibeChoiceHeader).toBeInTheDocument();
  });

  it("blocks sign up the email already exists", async () => {
    const contextValue = {
      loggedIn: false,
      showAlert: true,
      setShowAlert: jest.fn(),
      setLoggedIn: jest.fn(),
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const signUpLink = screen.getByText(/sign up/i);
    fireEvent.click(signUpLink);

    let emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const usernameInput = screen.getByLabelText("User Name");
    fireEvent.change(usernameInput, { target: { value: "testUserName" } });

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    const submitButton = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(submitButton);

    const duplicateAlert = await screen.findByText(
      "Username or email already exists"
    );
    expect(duplicateAlert).toBeInTheDocument();

    // sign up with new email and user name successfull
    fireEvent.change(emailInput, { target: { value: "testnew@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "newTestUserName" } });

    fireEvent.click(submitButton);

    const successAlert = await screen.findByText("Welcome to Vibe Check!");
    expect(successAlert).toBeInTheDocument();
  });

  it("checks a password is atleast 8 characters", async () => {
    const contextValue = {
      loggedIn: false,
      showAlert: true,
      setShowAlert: jest.fn(),
      setLoggedIn: jest.fn(),
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const signUpLink = screen.getByText(/sign up/i);
    fireEvent.click(signUpLink);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const usernameInput = screen.getByLabelText("User Name");
    fireEvent.change(usernameInput, { target: { value: "testUserName" } });

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "1234567" } });

    const submitButton = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(submitButton);

    const lengthAlert = await screen.findByText(
      "Password must be at least 8 characters long"
    );
    expect(lengthAlert).toBeInTheDocument();
  });
});
