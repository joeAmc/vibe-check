import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { AuthContext } from "../../AuthContext";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Nav", () => {
  it("renders Nav correctly", () => {
    const contextValue = {
      loggedIn: true,
      setShowAlert: jest.fn(),
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    //assert you the correct text is rendered for log/sign up page
    expect(screen.getByRole("heading", { name: "Log In" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "for vibes" })
    ).toBeInTheDocument();

    //assert that the correct text is rendered when clicking home button (vibe choice)
    const homeIcon = screen.getByRole("button", { name: "home-button" });
    expect(homeIcon).toBeInTheDocument();
    fireEvent.click(homeIcon);
    expect(
      screen.getByRole("heading", { name: "Vibe Choice" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "todays vibe" })
    ).toBeInTheDocument();
  });
});
