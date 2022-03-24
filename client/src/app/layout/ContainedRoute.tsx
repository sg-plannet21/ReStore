import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ContainedRoute() {
  return (
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  );
}
