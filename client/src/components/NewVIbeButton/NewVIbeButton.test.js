import React from "react";
import { render, screen } from "@testing-library/react";
import NewVibeButton from "./NewVIbeButton";
import { BrowserRouter } from "react-router-dom";

describe("NewVibeButton", () => {
  test("renders NewVibeButton component", () => {
    render(
      <BrowserRouter>
        <NewVibeButton />
      </BrowserRouter>
    );

    screen.debug();
  });
});
