import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { STATIC_CATEGORIES } from "../constants/Categories";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const formatSlug = (slug: string) =>
  slug
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");

const CATEGORY_MAP = Object.fromEntries(
  STATIC_CATEGORIES.map((cat) => [String(cat.id), cat.name])
);

const AutoBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (location.pathname === "/") return null;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator=">"
      sx={{ my: 2, fontSize: "0.875rem", color: "text.secondary" }}
    >
      {location.pathname !== "/home" && (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/home"
          fontSize="0.875rem"
        >
          Home
        </Link>
      )}

      {pathnames.map((segment, index) => {
        if (segment.toLowerCase() === "category") return null;
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        const isCategoryId = pathnames[index - 1] === "category";
        const isProductSlug = pathnames.length > 2 && index === 2;

        const displayText = isCategoryId
          ? CATEGORY_MAP[segment] ?? `Category ${segment}`
          : isProductSlug
          ? formatSlug(segment)
          : capitalize(segment);

        return isLast ? (
          <Typography color="text.primary" fontSize="0.875rem" key={to}>
            {displayText}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
            fontSize="0.875rem"
          >
            {displayText}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AutoBreadcrumbs;
