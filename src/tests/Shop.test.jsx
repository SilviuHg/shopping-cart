import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Shop from "../components/Shop";
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
    useOutletContext: vi.fn(),
  };
});

const mockedProducts = [
  {
    id: 1,
    title: "Product 1",
    image: "image1.jpg",
    category: "men's clothing",
  },
  {
    id: 2,
    title: "Product 2",
    image: "image2.jpg",
    category: "women's clothing",
  },
  { id: 3, title: "Product 3", image: "image3.jpg", category: "electronics" },
];

describe("Shop component", () => {
  it("renders loading state", () => {
    vi.mocked(useOutletContext).mockReturnValue([[]]);
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders all products initially", () => {
    vi.mocked(useOutletContext).mockReturnValue([mockedProducts]);
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );
    mockedProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toHaveAttribute(
        "src",
        product.image
      );
    });
  });

  it("filters products by category", async () => {
    vi.mocked(useOutletContext).mockReturnValue([mockedProducts]);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Men's clothing" }));
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Women's clothing" }));
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    mockedProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
