import { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, pageSize, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  function getSummary() {
    return `Displaying ${(currentPage - 1) * pageSize + 1} - ${
      currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize
    } of ${totalCount} items`;
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>{getSummary()}</Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(event, page) => handlePageChange(page)}
      />
    </Box>
  );
}
