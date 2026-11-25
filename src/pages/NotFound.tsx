import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { useTitle } from "../lib/useTitle";

export function NotFound() {
  useTitle("Page not found");
  return (
    <>
      <PageHeader title="Page not found" lede="There is no page or study at this address." />
      <div className="wrap page-body">
        <p>
          <Link to="/">Back to Overview</Link>
        </p>
      </div>
    </>
  );
}
