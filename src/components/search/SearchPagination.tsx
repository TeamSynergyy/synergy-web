import { Group, Pagination } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

export default function SearchPagination({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}) {
  const [scroll, scrollTo] = useWindowScroll();

  const handleChange = (page: number) => {
    setPage(page);
    scrollTo({ y: 0 });
  };
  return <Pagination value={page} onChange={handleChange} total={totalPages} />;
}
