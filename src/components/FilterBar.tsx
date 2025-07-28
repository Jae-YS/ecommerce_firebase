import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import type { ProductFilterState } from "../types/ProductFilterState";

type Props = {
  onApply: (filters: ProductFilterState) => void;
};

const FilterBar: React.FC<Props> = ({ onApply }) => {
  const [sortBy, setSortBy] =
    useState<ProductFilterState["sortBy"]>("date-desc");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleApply = () => {
    onApply({ sortBy, minPrice, maxPrice });
  };

  const handleResetFilters = () => {
    setSortBy("date-desc");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onApply({
      sortBy: "date-desc",
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
        alignItems: { sm: "center" },
        gap: 2,
        mb: 4,
      }}
    >
      <FormControl
        size="small"
        sx={{ minWidth: { xs: "100%", sm: 180 }, borderRadius: 2 }}
      >
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e: SelectChangeEvent) =>
            setSortBy(e.target.value as ProductFilterState["sortBy"])
          }
        >
          <MenuItem value="date-desc">Newest</MenuItem>
          <MenuItem value="date-asc">Oldest</MenuItem>
          <MenuItem value="name-asc">Name: A to Z</MenuItem>
          <MenuItem value="name-desc">Name: Z to A</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Min Price"
        size="small"
        type="number"
        value={minPrice ?? ""}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        sx={{ minWidth: { xs: "100%", sm: 140 }, borderRadius: 2 }}
      />

      <TextField
        label="Max Price"
        size="small"
        type="number"
        value={maxPrice ?? ""}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        sx={{ minWidth: { xs: "100%", sm: 140 }, borderRadius: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          fullWidth
          sx={{
            height: 40,
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: "0.05em",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          APPLY
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleResetFilters}
          sx={{
            height: 40,
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: "0.05em",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          RESET
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;
