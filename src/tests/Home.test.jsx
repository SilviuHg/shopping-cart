import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home component", () => {
  it("renders home products", () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("heading").textContent).toMatch(
      /Welcome to my market!/
    );
  });
});
