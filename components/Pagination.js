import Link from "next/link";
import React from "react";

function Pagination({ page, pageCount }) {
  return (
    <>
      <Link
        href={`/events?page=${page - 1}`}
        className={`btn-secondary ${page > 1 ? "vis-show" : "vis-hidden"}`}
      >
        Prev
      </Link>

      <Link
        href={`/events?page=${page + 1}`}
        className={`btn-secondary ${
          page < pageCount ? "vis-show" : "vis-hidden"
        } `}
      >
        Next
      </Link>
    </>
  );
}

export default Pagination;
