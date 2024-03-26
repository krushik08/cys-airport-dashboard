import { useRef, useState } from "react";
// import { render } from 'react-dom';
import Keyboard from "react-simple-keyboard";

// Instead of the default import, you can also use this:
// import { KeyboardReact as Keyboard } from "react-simple-keyboard"
import HomeIcon from "assets/images/icons/home.png";
import ArrowIcon from "assets/images/icons/arrow.png";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AirLinesButton = styled(Button)(() => ({
  width: 88,
  fontSize: "1.2rem",
  marginLeft: "16px",
}));

const InputLabelTxt = styled(InputLabel)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  minWidth: "500px",

  [theme.breakpoints.down("md")]: {
    minWidth: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "200px",
  },
}));

const Pnr = () => {
  const [layoutName, setLayoutName] = useState("default");
  const [error, setError] = useState();
  const flightId = JSON.parse(localStorage.getItem("flightInfo"))?.flightId;
  const [input, setInput] = useState("");
  const keyboard = useRef();
  const navigate = useNavigate();

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    const nextLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(nextLayoutName);
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
    setError("");
  };

  const keyboardOptions = {
    // ...commonKeyboardOptions,
    layout: {
      default: [
        "0 1 2 3 4 5 6 7 8 9",
        // '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Z X C V B N M",
        "{space}",
      ],
      shift: [],
    },
  };
  const handleGo = async () => {
    if (input) {
      await axios
        .get(`http://localhost:3001/book-flight/${input}?flightId=${flightId}`)
        .then((res) => {
          navigate("/select-pass");
          setError("");
        })
        .catch((err) => {
          console.log("err", err);
          setError(err?.response?.data?.message);
        });
    } else {
      setError("Please Enter PNR Number");
    }
    localStorage.setItem(
      "flightInfo",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("flightInfo")),
        PNRNumber: input,
      })
    );
  };

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
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ position: "relative" }}
      >
        <Grid item md={12} xs={12}>
          <Stack direction={"column"} spacing={5} alignItems={"center"}>
            <Box>
              <InputLabelTxt>Enter PNR</InputLabelTxt>
              <Stack direction={"row"} alignItems={"start"} mt={1}>
                <Box>
                  <TextFieldStyled
                    hiddenLabel
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    placeholder="Enter Your PNR"
                    fullWidth
                    value={input}
                    onChange={onChangeInput}
                    inputProps={{ maxLength: 6 }}
                  />
                  <Box component={"p"} sx={{ color: "#A80001" }}>
                    {error}
                  </Box>
                </Box>
                <AirLinesButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleGo}
                >
                  GO!
                </AirLinesButton>
              </Stack>
            </Box>

            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={layoutName}
              onChange={onChange}
              onKeyPress={onKeyPress}
              {...keyboardOptions}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Pnr;
