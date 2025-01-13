import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  // Split the pathname into an array
  const pathParts = location.pathname.split("/").filter((path) => path);

  // Build the breadcrumb based on the path
  const breadcrumbItems = pathParts.map((path, index) => {
    // Redirect the first breadcrumb (e.g., "Masters") to the dashboard
    const routeTo =
      index === 0
        ? "/"
        : `/${pathParts.slice(0, index + 1).join("/")}`;

    return (
      <span key={routeTo} className="flex items-center">
        <Link
          to={routeTo}
          className="text-blue-600 no-underline font-semibold hover:text-green-500 transition-colors"
        >
          {path.charAt(0).toUpperCase() + path.slice(1)}
        </Link>
        {index < pathParts.length - 1 && (
          <span className="text-gray-400 mx-2">/</span>
        )}
      </span>
    );
  });

  return <div className="flex space-x-2 text-lg">{breadcrumbItems}</div>;
}

export default Breadcrumbs;
