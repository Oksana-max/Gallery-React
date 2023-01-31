import React from "react";

export const Pagination = ({
  collectionsPerPage,
  totalCollections,
  currentPage,
  paginate,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalCollections / collectionsPerPage); i++) {
    pageNumber.push(i);
  }

  React.useEffect(() => {
    console.log("did mount");
    return () => {
      console.log("will unmount");
    };
  }, []);
  return (
    <ul className="pagination">
      {pageNumber.map((i) => (
        <li
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? "active" : ""}>
          {i}
        </li>
      ))}
    </ul>
  );
};
