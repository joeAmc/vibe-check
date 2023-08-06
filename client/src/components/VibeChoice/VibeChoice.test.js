import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VibeChoice from "./VibeChoice";
import { BrowserRouter } from "react-router-dom";

describe("VibeChoice", () => {
  test("renders VibeChoice component", () => {
    render(
      <BrowserRouter>
        <VibeChoice />
      </BrowserRouter>
    );
    // screen.debug();
  });
});
