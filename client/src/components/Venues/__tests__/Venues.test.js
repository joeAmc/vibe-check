import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import "@testing-library/jest-dom";
import Venues from "../Venues";
import Auth from "../../Auth/Auth";
import { setupServer } from "msw/node";
import { handlers } from "../../Mocks/handlers";
import "whatwg-fetch";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
  process.env.REACT_APP_API = "http://localhost:4000";
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Venues", () => {
  it("renders Venues correctly", async () => {
    const contextValue = {
      loggedIn: true,
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/venues/Cosy_Pub"]}>
          <Routes>
            <Route path="/venues/:type" element={<Venues />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    //assert nav has correct headers
    expect(screen.getByText("Cosy Pub's")).toBeInTheDocument();
    expect(screen.getByText("FInd Your Vibe")).toBeInTheDocument();

    // assert cosy pub data is fetched and rendered
    const pub1Name = await screen.findByText("The Chesham");
    const pub1Location = await screen.findByText("Brighton, United Kingdom");
    const pub1Vibes = await screen.findByText("0");
    const pub1CheckIn = await screen.findByText("Checked in - 12:24AM");

    expect(pub1Name).toBeInTheDocument();
    expect(pub1Location).toBeInTheDocument();
    expect(pub1Vibes).toBeInTheDocument();
    expect(pub1CheckIn).toBeInTheDocument();

    const pub2Name = await screen.findByText("The Kenton Arms");
    const pub2Location = await screen.findByText("London, United Kingdom");
    const pub2Vibes = await screen.findByText("2");
    const pub2CheckIn = await screen.findByText("Checked in - 8:17AM");

    expect(pub2Name).toBeInTheDocument();
    expect(pub2Location).toBeInTheDocument();
    expect(pub2Vibes).toBeInTheDocument();
    expect(pub2CheckIn).toBeInTheDocument();

    const pubImages = await screen.findAllByAltText("pub");
    expect(pubImages.length).toBe(2);

    // assert that the number of vibe votes increases and class changes on button click
    const vibeVoteButtons = await screen.findAllByRole("button", {
      name: "vibe-votes",
    });

    const vibeVoteButton = vibeVoteButtons[1];
    const vibeVotesNumber = await screen.findByText("0");
    fireEvent.click(vibeVoteButton);
    expect(vibeVotesNumber).toHaveTextContent("1");
  });

  it("shows alert if user not logged in and redirects to log in page", async () => {
    const contextValue = {
      loggedIn: false,
      showAlert: true,
      setShowAlert: () => {},
    };

    const { container } = render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/venues/Cosy_Pub"]}>
          <Routes>
            <Route path="/venues/:type" element={<Venues />} />
            <Route path="/" element={<Auth />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const authAlert = screen.getByText("Log in or Sign up!");
    expect(authAlert).toBeInTheDocument();

    const closeAlertbtn = screen.getByRole("button", { name: "close-alert" });
    expect(closeAlertbtn).toBeInTheDocument();

    fireEvent.click(closeAlertbtn);

    // assert alert is closed and user is redirected to auth page
    expect(authAlert).not.toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});
