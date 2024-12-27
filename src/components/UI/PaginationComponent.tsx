'use client';
import Pagination from 'react-responsive-pagination';
const PaginationComponent = ({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (page: number) => void;
}) => {
  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={handlePageChange}
      className="pagination-container my-10"
    />
  );
};

export default PaginationComponent;
