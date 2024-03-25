import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Card, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              mb={1}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: "3rem" }}
                color="secondary"
              />
              <Typography
                variant="h2"
                textAlign="center"
                fontWeight="bold"
                color="secondary"
              >
                Thank You!
              </Typography>
            </Box>
            <Typography variant="h3" textAlign="center" color="text.secondary">
              Thank you for choosing us. Your boarding pass is ready. We wish
              you a pleasant journey!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/select-flight")}
            >
              Back to Home
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
