import { Container, Divider, Paper, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {(state as any)?.error ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {(state as any).error.title}
          </Typography>
          <Divider />
          <Typography>
            {(state as any).error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>Go back to the Store</Button>
    </Container>
  );
}
