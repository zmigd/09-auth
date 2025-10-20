import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css"

interface PaginationProps {
    totalPages: number;
    page: number;
    onPageChange: (selected: number) => void;
}

export default function Pagination({ totalPages, page, onPageChange }: PaginationProps) {
    if (totalPages === 0) {
        return null;
    }
    return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      disabledClassName={css.disabledButton}
    />
  );
}