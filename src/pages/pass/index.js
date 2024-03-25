import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import BoardingPass from "assets/images/flights/boarding-pass.png";
import TagPass from "assets/images/flights/tag-pass.png";
import { Link, useNavigate } from "react-router-dom";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import Select from "react-select";
import { Stack } from "@mui/system";
import HomeIcon from "assets/images/icons/home.png";
import ArrowIcon from "assets/images/icons/arrow.png";

//
const AirLineCard = styled(MainCard)(({ theme }) => ({
  border: "3px solid transparent",
  borderRadius: "12px",
  ":hover": {
    // background: '#f2f',
    border: `3px solid ${theme.palette.secondary.main}`,
    // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 25px 50px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },

  [theme.breakpoints.down("md")]: {},
}));

const AirLinesLogo = styled(Box)(() => ({
  width: "300px",
  // height: '100px',
  aspectRatio: 1 / 1,
}));

const AirLinesTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  textAlign: "center",
  whiteSpace: "nowrap",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
}));

const AirLinesButton = styled(Button)(() => ({
  height: 56,
  width: 108,
  fontSize: "1.2rem",
}));

const Pass = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ position: "absolute", top: 0, py: 2 }}
        gap={2}
      >
        <Box
          component={"img"}
          src={ArrowIcon}
          height={55}
          sx={{ rotate: "180deg", cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />

        <Link to={"/"}>
          <Box component={"img"} src={HomeIcon} height={55} />
        </Link>
      </Stack>

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} mb={3}>
          <Typography
            variant="h1"
            textAlign={"center"}
            sx={{ textTransform: "capitalize" }}
            color={"secondary"}
          >
            Please select your pass type{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AirLineCard sx={{ height: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
            >
              <Grid mb={2}>
                <AirLinesTitle>Boarding Pass </AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={BoardingPass} />
              </Grid>

              <Grid item mt={2}>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate("/boarding-pass")}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AirLineCard sx={{ height: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
            >
              <Grid mb={2}>
                <AirLinesTitle>Baggage Tags</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={TagPass} />
              </Grid>

              <Grid item mt={2}>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate("/baggage-pass")}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Pass;
