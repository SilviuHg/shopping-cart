import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart";
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

const mockedCart = [
  {
    id: 1,
    title: "Product 1",
    image: "image1.jpg",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    title: "Product 2",
    image: "image2.jpg",
    price: 20,
    quantity: 2,
  },
];

const handleDeleteCartItems = vi.fn();
const handleIncrementQuantity = vi.fn();
const handleDecrementQuantity = vi.fn();

describe("Cart component", () => {
  it("renders empty cart", async () => {
    vi.mocked(useOutletContext).mockReturnValue([
      undefined, // Placeholder for the first context value
      undefined, // Placeholder for the second context value
      handleDeleteCartItems,
      [],
      handleIncrementQuantity,
      handleDecrementQuantity,
    ]);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Your shopping cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText("Fill it with your favorite pieces")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Shop now" })
    ).toBeInTheDocument();
  });

  it("renders cart items and order summary", () => {
    vi.mocked(useOutletContext).mockReturnValue([
      undefined,
      undefined,
      handleDeleteCartItems,
      mockedCart,
      handleIncrementQuantity,
      handleDecrementQuantity,
    ]);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    );

    mockedCart.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`Qty: ${product.quantity}`)).toBeInTheDocument();
      expect(
        screen.getByText(`$${(product.price * product.quantity).toFixed(2)}`)
      ).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toHaveAttribute(
        "src",
        product.image
      );
    });

    expect(screen.getByText("Order summary")).toBeInTheDocument();
    expect(screen.getAllByText("$50.00")[0]).toBeInTheDocument();
  });

  it("handles increment, decrement, and delete actions", async () => {
    vi.mocked(useOutletContext).mockReturnValue([
      undefined,
      undefined,
      handleDeleteCartItems,
      mockedCart,
      handleIncrementQuantity,
      handleDecrementQuantity,
    ]);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    );

    // Increment quantity
    await user.click(screen.getAllByRole("button", { name: "+" })[0]);
    expect(handleIncrementQuantity).toHaveBeenCalledWith(mockedCart[0]);

    // Decrement quantity
    await user.click(screen.getAllByRole("button", { name: "-" })[0]);
    expect(handleDecrementQuantity).toHaveBeenCalledWith(mockedCart[0]);

    // Delete item
    const deleteButton = screen
      .getByAltText(`Delete ${mockedCart[0].title}`)
      .closest("button");
    await user.click(deleteButton);
    expect(handleDeleteCartItems).toHaveBeenCalledWith(mockedCart[0]);
  });
});
