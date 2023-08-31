import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Nav from "../Nav";
import { AuthContext } from "../../../AuthContext";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Nav", () => {
  it("renders Nav correctly", async () => {
    const contextValue = {
      loggedIn: true,
      showAlert: true,
      setShowAlert: jest.fn(),
      setLoggedIn: jest.fn(),
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

    //assert sign out alert is rendered when clicking profile icon
    const profileIcon = screen.getByRole("button", { name: "profile-button" });
    expect(profileIcon).toBeInTheDocument();
    fireEvent.click(profileIcon);

    const closeAlertButton = screen.getByRole("button", {
      name: "close-signout-btn",
    });
    expect(closeAlertButton).toBeInTheDocument();

    const signOutButton = screen.getByText("Sign Out?");
    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(closeAlertButton);
    expect(contextValue.setShowAlert).toHaveBeenCalledWith(false);

    fireEvent.click(profileIcon);
    fireEvent.click(signOutButton);
    expect(contextValue.setLoggedIn).toHaveBeenCalledWith(false);
  });
});
