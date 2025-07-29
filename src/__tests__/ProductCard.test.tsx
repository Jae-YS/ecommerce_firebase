import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockProduct = {
  id: "1",
  name: "Test Product",
  slug: "test-product",
  price: 20,
  description: "A test product",
  images: ["https://placehold.co/600x400/png?text=Test+Product"],
  category: { id: 1, name: "Test Category" },
  creationAt: "2024-07-28T00:00:00Z",
  updatedAt: "2024-07-28T00:00:00Z",
  quantity: 10,
  createdBy: {
    id: "testUserId",
    displayName: "Test User",
    email: "testuser@example.com",
  },
};

describe("ProductCard Component", () => {
  test("renders product details correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$?\s?20/i)).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /test product/i })
    ).toBeInTheDocument();
  });

  test("navigates to product details page on click", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/test product/i));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/category/${mockProduct.category.id}/${mockProduct.slug}`
    );
  });
});
