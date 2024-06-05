import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
  it("renders navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument;
    expect(screen.getByRole("button", { name: "Shop" })).toBeInTheDocument;
    expect(screen.getByRole("button", { name: /Cart/ })).toBeInTheDocument;
  });
});
