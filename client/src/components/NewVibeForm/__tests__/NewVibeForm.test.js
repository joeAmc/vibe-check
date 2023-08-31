import React from "react";
import {
  render,
  screen,
  fireEvent,
  logRoles,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import "@testing-library/jest-dom";
import NewVibeForm from "../NewVibeForm";
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

describe("New vibe form", () => {
  it("renders new vibe form correctly", async () => {
    const contextValue = {
      loggedIn: true,
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/new-vibe/Cosy_Pub"]}>
          <Routes>
            <Route path="/new-vibe/:type" element={<NewVibeForm />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    //assert nav has correct headers
    expect(screen.getByText(/check in/i)).toBeInTheDocument();
    expect(screen.getByText(/where's the vibe\?/i)).toBeInTheDocument();

    // assert vibe type is automatically selected
    const vibeType = screen.getByLabelText("Vibe Type");
    expect(vibeType).toHaveValue("Cosy Pub");

    // fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toHaveValue("");
    fireEvent.change(nameInput, { target: { value: "Test Pub" } });

    const locationInput = screen.getByLabelText("Location");
    expect(locationInput).toHaveValue("");
    fireEvent.change(locationInput, {
      target: { value: "Southampton, United Kingdom" },
    });

    const submitButton = screen.getByRole("button", { name: "Check Vibe In" });
    // fireEvent.click(submitButton);

    // screen.debug();
  });
});
