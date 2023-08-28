import React from "react";
import { render, screen } from "@testing-library/react";
import NewVibeButton from "./NewVIbeButton";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

describe("NewVibeButton", () => {
  test("renders NewVibeButton component", () => {
    const contextValue = {
      loggedIn: true,
      setShowAlert: jest.fn(),
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <NewVibeButton />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    // screen.debug();
  });
});
