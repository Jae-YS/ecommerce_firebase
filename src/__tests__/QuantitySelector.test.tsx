import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

test("renders cart button with correct item count", () => {
  const handleClick = jest.fn();
  render(
    <IconButton onClick={handleClick}>
      <Badge badgeContent={3} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );

  expect(screen.getByText("3")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
