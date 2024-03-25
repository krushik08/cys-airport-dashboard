import { Box, Button, Container, Grid, Stack, styled } from "@mui/material";
import { gridSpacing } from "store/constant";
import "./pass.css";
import DownloadIcon from "@mui/icons-material/Download";
import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import Air1 from "assets/images/flights/Air1.png";
import Air2 from "assets/images/flights/Air2.png";
import Air3 from "assets/images/flights/Air3.png";
import Air4 from "assets/images/flights/Air4.png";
import Air5 from "assets/images/flights/Air5.png";
import Air6 from "assets/images/flights/Air6.png";
import AirLogo from "assets/images/flighticon.svg";
import qrcode from "qrcode";
import ReactToPrint from "react-to-print";

import HomeIcon from "assets/images/icons/home.png";
import ArrowIcon from "assets/images/icons/arrow.png";

const DownloadButton = styled(Button)(() => ({
  height: 56,
  // width: 108,
  fontSize: "1.2rem",
}));
const AirLinesLogo = styled(Box)(({ theme }) => ({
  width: "70px",
  aspectRatio: 1 / 1,
  borderRadius: "8px",
  padding: "4px",

  [theme.breakpoints.up("md")]: {
    width: "70px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "70px",
  },
}));

const BoardingPass = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");
  const [flight, setFlight] = useState();
  const flightData = JSON.parse(localStorage.getItem("flightInfo"));
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/book-flight/${flightData.PNRNumber}`)
      .then((res) => {
        debugger;
        return setFlight(res.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchData(); // Clean up code here
  }, []);
  useEffect(() => {
    generateQRCode(flight);
  }, [flight]);
  const generateQRCode = async (flight) => {
    try {
      // Generate QR code as a data URL
      const generatedQRCode = await qrcode.toDataURL(flight?.PNRNumber, {
        width: "130px",
        height: "130px",
      });
      setQRCodeDataURL(generatedQRCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <
      // sx={{
      //   height: '80vh',
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

      <Grid
        container
        spacing={gridSpacing}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={5} ref={ref}>
          <div className="boarding-pass">
            <div className="header">
              {flight?.flightId?.imgPath === "Air1" && (
                <AirLinesLogo component="img" src={Air1} />
              )}
              {flight?.flightId?.imgPath === "Air2" && (
                <AirLinesLogo component="img" src={Air2} />
              )}
              {flight?.flightId?.imgPath === "Air3" && (
                <AirLinesLogo component="img" src={Air3} />
              )}
              {flight?.flightId?.imgPath === "Air4" && (
                <AirLinesLogo component="img" src={Air4} />
              )}
              {flight?.flightId?.imgPath === "Air5" && (
                <AirLinesLogo component="img" src={Air5} />
              )}
              {flight?.flightId?.imgPath === "Air6" && (
                <AirLinesLogo component="img" src={Air6} />
              )}
              <div className="flight">
                <small>flight</small>
                <strong>{flight?.flightId?.flightNo}</strong>
              </div>
            </div>
            <section className="cities">
              <div className="city">
                <small>{flight?.departureAirport.slice(0, 27) + "..."}</small>

                <strong>{flight?.departureLocation}</strong>
              </div>
              <div className="city">
                <small>{flight?.arrivalAirport.slice(0, 27) + "..."}</small>

                <strong>{flight?.arrivalLocation}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img style={{ width: "40px" }} src={AirLogo} />
              </div>
            </section>
            <section className="infos">
              <div className="places">
                <div className="box">
                  <small>Terminal</small>
                  <strong>
                    <em>W</em>
                  </strong>
                </div>
                <div className="box">
                  <small>Gate</small>
                  <strong>
                    <em>C3</em>
                  </strong>
                </div>
                <div className="box">
                  <small>Seat</small>
                  <strong>14B</strong>
                </div>
                <div className="box">
                  <small>Class</small>
                  <strong>E</strong>
                </div>
              </div>
              <div className="times">
                <div className="box">
                  <small>Boarding</small>
                  {moment(flight?.departureDate)
                    .subtract(20, "minutes")
                    .format("HH:mm")}
                </div>
                <div className="box">
                  <small>Departure</small>
                  <strong>
                    {moment(flight?.departureDate).format("HH:mm")}
                  </strong>
                </div>
                <div className="box">
                  <small>Duration</small>
                  <strong>2:00</strong>
                </div>
                <div className="box">
                  <small>Arrival</small>
                  <strong>
                    {" "}
                    {moment(flight?.departureDate)
                      .add(2, "hours")
                      .format("HH:mm")}
                  </strong>
                </div>
              </div>
            </section>
            <section className="strap ">
              <div
                className="box"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ flexDirection: "column" }}>
                  <div className="passenger">
                    <small>passenger</small>
                    <strong>
                      {flight?.firstName} {flight?.lastName}
                    </strong>
                  </div>
                  <div className="date">
                    <small>Date</small>
                    <strong>
                      {moment(flight?.departureDate).format("DD MMM YYYY")}
                    </strong>
                  </div>
                </div>
                <div className="qr-code">
                  <img src={qrCodeDataURL} alt="QR Code" />
                </div>
              </div>
            </section>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0"
            height="0"
            display="none"
          >
            <symbol id="airplane" viewBox="243.5 245.183 25 21.633">
              <g>
                <path
                  fill="#673ab7"
                  d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                              c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                              c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                              "
                />
              </g>
            </symbol>
          </svg>
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
              onBeforeGetContent={() => {}}
              // onAfterPrint={() => navigate('/thank-you')}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default BoardingPass;
