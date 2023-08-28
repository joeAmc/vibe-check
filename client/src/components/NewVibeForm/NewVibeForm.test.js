import React from "react";
import {
  render,
  screen,
  fireEvent,
  logRoles,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "@testing-library/jest-dom";
import NewVibeForm from "./NewVibeForm";
import { setupServer } from "msw/node";
import { handlers } from "../Mocks/handlers";
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

    // assert fields and submit button labels are correct
    expect(
      screen.getByRole("textbox", { name: "Vibe Type" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Location" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Check Vibe In" })
    ).toBeInTheDocument();
  });
});
