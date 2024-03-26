import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import AeroZephyr from 'assets/images/flights/Air1.png';
import AviaNex from 'assets/images/flights/Air22.png';
import SkyZenith from 'assets/images/flights/Air3.png';
import Equinox from 'assets/images/flights/Air4.png';
import AlturaJet from 'assets/images/flights/Air5.png';
import NovaGlide from 'assets/images/flights/Air6.png';
import Air1 from 'assets/images/flights/Air1.png';
import Air2 from 'assets/images/flights/Air2.png';
import Air3 from 'assets/images/flights/Air3.png';
import Air4 from 'assets/images/flights/Air4.png';
import Air5 from 'assets/images/flights/Air5.png';
import Air6 from 'assets/images/flights/Air6.png';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

//
const AirLineCard = styled(MainCard)(({ theme }) => ({
  border: '3px solid transparent',
  borderRadius: '12px',
  ':hover': {
    // background: '#f2f',
    border: `3px solid ${theme.palette.secondary.main}`,
    // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 25px 50px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  },

  [theme.breakpoints.down('md')]: {},
}));

const AirLinesLogo = styled(Box)(({ theme }) => ({
  width: '150px',
  // aspectRatio: 2 / 1,
  borderRadius: '8px',

  // [theme.breakpoints.up('md')]: {
  //   width: '250px',
  // },
  // [theme.breakpoints.up('sm')]: {
  //   width: '200px',
  // },
}));

const AirLinesTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
}));

const AirLinesButton = styled(Button)(() => ({
  height: 56,
  width: 108,
  fontSize: '1.2rem',
}));

const SelectFlight = () => {
  const navigate = useNavigate();
  const [flight, setFlight] = useState([]);
  const handleChange = (e) => {
    navigate('/pnr');
    localStorage.setItem(
      'flightInfo',
      JSON.stringify({ flightId: e.target.id })
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/flight/list`)
      .then((res) => {
        return setFlight(res.data?.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        <Grid
          item
          xs={12}
          mb={1}
          display={'flex'}
          justifyContent={'space-around'}
          padding={'0px'}
        >
          <Typography
            variant="h1"
            textAlign={'center'}
            sx={{ textTransform: 'capitalize' }}
            color={'secondary'}
          >
            Please select your travel Airline{' '}
          </Typography>
        </Grid>
        {flight.length ? (
          <>
            {flight.map((item) => (
              <Grid item xs={12} sm={6} md={4}>
                <AirLineCard sx={{ height: '100%' }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Grid>
                      <AirLinesTitle> {item?.name} </AirLinesTitle>
                    </Grid>

                    <Grid>
                      {/* <AirLinesLogo component="img" src={NovaGlide} /> */}
                      {item?.imgPath === 'Air1' && (
                        <AirLinesLogo component="img" src={Air1} />
                      )}
                      {item?.imgPath === 'Air2' && (
                        <AirLinesLogo component="img" src={Air2} />
                      )}
                      {item?.imgPath === 'Air3' && (
                        <AirLinesLogo component="img" src={Air3} />
                      )}
                      {item?.imgPath === 'Air4' && (
                        <AirLinesLogo component="img" src={Air4} />
                      )}
                      {item?.imgPath === 'Air5' && (
                        <AirLinesLogo component="img" src={Air5} />
                      )}
                      {item?.imgPath === 'Air6' && (
                        <AirLinesLogo component="img" src={Air6} />
                      )}
                    </Grid>

                    <Grid item>
                      <AirLinesButton
                        variant="contained"
                        size="large"
                        color="secondary"
                        id={item?._id}
                        onClick={handleChange}
                      >
                        Select
                      </AirLinesButton>
                    </Grid>
                  </Grid>
                </AirLineCard>
              </Grid>
            ))}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};

export default SelectFlight;
