import { useEffect } from "react";

const SITE = "Data Center Gap Mapper";

/** Sets the document title, e.g. "Water | Data Center Gap Mapper". */
export function useTitle(page: string) {
  useEffect(() => {
    document.title = `${page} | ${SITE}`;
  }, [page]);
}
