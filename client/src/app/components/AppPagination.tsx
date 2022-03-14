import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData | null;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  if (!metaData) return null;
  const { currentPage, pageSize, totalCount, totalPages } = metaData;

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
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
      />
    </Box>
  );
}
