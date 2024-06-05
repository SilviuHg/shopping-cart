import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../components/Home";
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
} from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(), // Provide a mock function for useOutletContext while keeping the rest of the original react-router-dom module
  };
});

const mockedProducts = [
  { id: 1, title: "Product 1", image: "image1.jpg", price: 10 },
  { id: 2, title: "Product 2", image: "image2.jpg", price: 20 },
  { id: 3, title: "Product 3", image: "image3.jpg", price: 30 },
];

vi.mocked(useOutletContext).mockReturnValue([mockedProducts]);

describe("Home component", () => {
  it("renders home description", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 2 }).textContent).toMatch(
      /Welcome to my market!/
    );
  });

  it("renders home products", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    mockedProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });
});
