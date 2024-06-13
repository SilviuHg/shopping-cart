import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Product from "../components/Product";
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
  useParams,
} from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockedProducts = [
  {
    id: 1,
    title: "Product 1",
    image: "image1.jpg",
    price: 10,
    description: "Description for product 1",
  },
  {
    id: 2,
    title: "Product 2",
    image: "image2.jpg",
    price: 20,
    description: "Description for product 2",
  },
];

const mockedCart = [];

const handleAddCartItems = vi.fn();

describe("Product component", () => {
  it("renders product details", async () => {
    vi.mocked(useParams).mockReturnValue({ productId: "1" });
    vi.mocked(useOutletContext).mockReturnValue([
      mockedProducts,
      handleAddCartItems,
      mockedCart,
    ]);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Description for product 1")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByAltText("Product 1")).toHaveAttribute(
      "src",
      "image1.jpg"
    );
  });

  it("tests quantity adjustment and add to cart", async () => {
    vi.mocked(useParams).mockReturnValue({ productId: "1" });
    vi.mocked(useOutletContext).mockReturnValue([
      mockedProducts,
      handleAddCartItems,
      mockedCart,
    ]);

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    // Increment quantity
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("2")).toBeInTheDocument();

    // Decrement quantity
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText("1")).toBeInTheDocument();

    // Add to cart
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(handleAddCartItems).toHaveBeenCalledWith(mockedProducts[0], 1);
  });
});
