/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({
  params,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
  totalPages,
  hideDisabled,
  hideNavigation,
}) => {
  const handlePageSelect = (page) => {
    if (onChange) {
      onChange(page);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    const displayRange = Math.min(pageRangeDisplayed, totalPages);

    if (totalPages <= displayRange) {
      // If total pages are less than or equal to the display range, show all pages
      for (let page = 1; page <= totalPages; page++) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === activePage}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </Pagination.Item>,
        );
      }
    } else {
      // If total pages exceed the display range, show ellipsis for middle pages
      const rangeStart = Math.max(
        1,
        Math.min(activePage - Math.floor(displayRange / 2), totalPages - displayRange + 1),
      );
      const rangeEnd = rangeStart + displayRange - 1;

      if (rangeStart > 1) {
        pageItems.push(
          <Pagination.Ellipsis key={`ellipsis_start_${rangeStart}`} disabled={hideDisabled} />,
        );
      }

      for (let page = rangeStart; page <= rangeEnd; page++) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === activePage}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </Pagination.Item>,
        );
      }

      if (rangeEnd < totalPages) {
        pageItems.push(
          <Pagination.Ellipsis key={`ellipsis_end_${rangeEnd}`} disabled={hideDisabled} />,
        );
      }
    }

    return pageItems;
  };

  return (
    <Pagination className="d-flex justify-content-between align-items-center border border-primary border-1 p-2 ms-2 rounded pagination">
      <Pagination.First
        onClick={() => handlePageSelect(1)}
        disabled={activePage === 1 || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      <Pagination.Prev
        onClick={() => handlePageSelect(activePage - 1)}
        disabled={activePage === 1 || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      {renderPageItems()}
      <Pagination.Next
        onClick={() => handlePageSelect(activePage + 1)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      <Pagination.Last
        onClick={() => handlePageSelect(totalPages)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
    </Pagination>
  );
};

export default PaginationComponent;
