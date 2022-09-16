import styles from "./Paginate.module.css";

import ReactPaginate, { ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {}

const Paginate: React.FC<Props> = ({
  nextLabel = ">>",
  previousLabel = "<<",
  breakLabel = "...",
  pageCount = 10,
  ...props
}) => {
  return (
    <div>
      <ReactPaginate
        {...props}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        breakLabel={breakLabel}
        pageCount={pageCount}
        containerClassName={styles.pagination}
        pageClassName={styles.paginationItem}
        breakClassName={styles.paginationItem}
        activeClassName={styles.active}
        previousClassName={styles.paginationItem}
        nextClassName={styles.paginationItem}
      />
    </div>
  );
};

export default Paginate;
