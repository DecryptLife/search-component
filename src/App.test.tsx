import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("Search component Test", () => {
  it("Search component rendered ", () => {
    render(<App />);

    const header = screen.getByText("Search Component");
    expect(header).toBeInTheDocument();
  });
});
