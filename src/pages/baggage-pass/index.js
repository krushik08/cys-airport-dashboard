/* eslint-disable no-unused-vars */
import DownloadIcon from "@mui/icons-material/Download";
import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactToPrint from "react-to-print";
//
import HomeIcon from "assets/images/icons/home.png";
import ArrowIcon from "assets/images/icons/arrow.png";

const DownloadButton = styled(Button)(() => ({
  height: 56,
  // width: 108,
  fontSize: "1.2rem",
}));

function BaggagePass() {
  const bagCountList = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
  ];
  const theme = useTheme();
  const ref = useRef();
  const navigate = useNavigate();
  const [flight, setFlight] = useState();
  const [bagCount, setBagCount] = useState(bagCountList[0]);
  const [barCode, setBarCode] = useState([]);
  const flightData = JSON.parse(localStorage.getItem("flightInfo"));
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/book-flight/${flightData.PNRNumber}`)
      .then((res) => {
        console.log("res.data?.data", res.data?.data);
        return setFlight(res.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const airports = [
    {
      value: "Dubai",
      label: "Dubai (DXB - Dubai International Airport)",
      airport: "Dubai International Airport",
      code: "DXB",
    },
    {
      value: "Abu Dhabi",
      label: "Abu Dhabi (AUH - Zayed International Airport)",
      airport: "Zayed International Airport",
      code: "AUH",
    },
    {
      value: "Mumbai",
      label: "Mumbai (BOM - Chhatrapati Shivaji Maharaj International Airport)",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
    },
    {
      value: "London",
      label: "London (OXF - Oxford, United Kingdom)",
      airport: "Oxford, United Kingdom",
      code: "OXF",
    },
    {
      value: "Paris",
      label: "Paris (PAR - Charles de Gaulle Airport)",
      airport: "Charles de Gaulle Airport",
      code: "PAR",
    },
    {
      value: "New York",
      label: "New York (JFK - John F. Kennedy International Airport)",
      airport: "John F. Kennedy International Airport",
      code: "JFK",
    },
    {
      value: "Barcelona",
      label: "Barcelona (BCN - Josep Tarradellas Barcelona–El Prat Airport)",
      airport: "Josep Tarradellas Barcelona–El Prat Airport",
      code: "BCN",
    },
  ];
  useEffect(() => {
    fetchData(); // Clean up code here
  }, []);
  const handleDownload = async () => {
    await axios
      .put(`http://localhost:3001/book-flight/${flightData.PNRNumber}`, {
        baggageTag: barCode,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    const result = [];
    for (let i = 0; i < bagCount?.value; i++) {
      result.push(Math.floor(Math.random() * 900000) + 100000);
    }
    setBarCode(result);
  }, [bagCount]);

  return (
    <
      // sx={{
      //   // height: '80vh',
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      // }}
    >
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
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Card
            className="baggege-card"
            sx={{ maxWidth: "sm", mx: "auto", width: "100%" }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    background: "white",
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    border: `10px solid ${theme.palette.secondary.main}`,
                  }}
                />
                <Typography variant="h1" color="secondary">
                  Baggege Tag
                </Typography>
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                  }}
                >
                  To:
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 50, letterSpacing: 12 }}
                  textAlign={"center"}
                  color={"secondary"}
                >
                  {flight?.departureLocation}
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Stack direction="row" alignItems={"center"} gap={2}>
                  {console.log("flight?.flightId", flight?.flightId?.flightNo)}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "400",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Flight No: {flight?.flightId?.flightNo}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {flight?.flightNumber}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems={"center"} gap={2}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "400",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Weight Of Baggage:
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    20Kg
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Grid container p={2} alignItems={"center"}>
                {/* <Stack direction="row" alignItems={'center'} gap={2}> */}
                <Grid item xs={6}>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={3}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "400",
                          color: theme.palette.text.primary,
                        }}
                      >
                        Name:{" "}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.text.primary,
                          textTransform: "uppercase",
                        }}
                      >
                        {flight?.firstName} {flight?.lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Stack> */}
                {/* <Stack direction="row" alignItems={'center'} gap={2}> */}
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                  >
                    <Grid item xs={4}>
                      {" "}
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "400",
                          color: theme.palette.text.primary,
                        }}
                      >
                        No. Bag:{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        options={bagCountList}
                        value={bagCount}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                        onChange={(newValue) => {
                          setBagCount(newValue);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Stack> */}
              </Grid>
              <Divider />
              <Box
                ref={ref}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center ",
                  alignItems: "center",
                  p: 2,
                }}
              >
                {barCode.map((item) => (
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Stack direction="row" alignItems={"center"} gap={2}>
                      <Typography
                        sx={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: theme.palette.text.primary,
                          textTransform: "uppercase",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {
                          airports.find(
                            (item) => flight?.departureLocation === item?.code
                          )?.value
                        }
                        / {flight?.departureLocation}
                        <Barcode value={item} />
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: 50,
                        marginLeft: 10,
                        fontWeight: "bold",
                        color: theme.palette.text.primary,
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {flight?.departureLocation}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"center"} mt={3}>
            <ReactToPrint
              trigger={() => (
                <DownloadButton
                  variant="contained"
                  textAlign={"center"}
                  color={"secondary"}
                  size="large"
                  startIcon={<DownloadIcon />}
                >
                  Print Baggege Tag
                </DownloadButton>
              )}
              content={() => ref.current}
              onAfterPrint={handleDownload}
              onBeforeGetContent={() => {}}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default BaggagePass;
