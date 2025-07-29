import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductDetailPage from "../pages/ProductView";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { UIProvider } from "../context/ui/UIProvider";

jest.mock("../hooks/useFetchProductBySlug", () => ({
  useFetchProductBySlug: () => ({
    data: {
      id: "1",
      name: "Test Product",
      slug: "test-product",
      price: 20,
      description: "A test product",
      images: ["https://placehold.co/600x400/png?text=Test+Product"],
      category: { id: "1", name: "Test Category" },
      createdBy: { email: "owner@example.com" },
      creationAt: new Date().toISOString(),
    },
    isLoading: false,
  }),
}));

jest.mock("../context/auth/useAuthContext", () => ({
  useAuthContext: () => ({
    user: {
      email: "testuser@example.com",
      uid: "123",
      displayName: "Test User",
    },
  }),
}));

const mockStore = configureStore([]);

describe("ProductDetailPage Integration", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [], userEmail: null },
    });
    store.dispatch = jest.fn();
  });

  it("dispatches addToCart action when Add to Cart is clicked", () => {
    render(
      <Provider store={store}>
        <UIProvider>
          <MemoryRouter initialEntries={["/product/test-product"]}>
            <Routes>
              <Route path="/product/:slug" element={<ProductDetailPage />} />
            </Routes>
          </MemoryRouter>
        </UIProvider>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      addToCart({
        product: expect.objectContaining({ id: "1", name: "Test Product" }),
        email: "testuser@example.com",
      })
    );
  });
});
