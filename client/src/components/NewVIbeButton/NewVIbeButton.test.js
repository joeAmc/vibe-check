import React from "react";
import { render, screen } from "@testing-library/react";
import NewVibeButton from "./NewVIbeButton";

describe("NewVibeButton", () => {
  test("renders NewVibeButton component", () => {
    render(<NewVibeButton />);
    // screen.debug();
  });
});
