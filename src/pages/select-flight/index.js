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

import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

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
  const handleChange = (e) => {
    navigate('/pnr');
    localStorage.setItem(
      'flightInfo',
      JSON.stringify({ flightId: e.target.id })
    );
  };
  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} mb={1}>
          <Typography
            variant="h1"
            textAlign={'center'}
            sx={{ textTransform: 'capitalize' }}
            color={'secondary'}
          >
            Please select your travel Airline{' '}
          </Typography>
        </Grid>
        {/* Air Arabia */}
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
                <AirLinesTitle> NovaGlide </AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={NovaGlide} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f934de1dec2e81acb9d544"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        {/* Air Arabia Abu Dhabi */}
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
                <AirLinesTitle>AeroZephyr</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={AeroZephyr} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f9351c1dec2e81acb9d546"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        {/* Emirates */}
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
                <AirLinesTitle>AviaNex</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={AviaNex} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f935731dec2e81acb9d548"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        {/* Etihad Airways */}
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
                <AirLinesTitle>SkyZenith</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={SkyZenith} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f935921dec2e81acb9d54a"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        {/* Flydubai */}
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
                <AirLinesTitle>Equinox</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={Equinox} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f935db1dec2e81acb9d54c"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>

        {/* Wizz Air Abu Dhabi */}
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
                <AirLinesTitle>AlturaJet</AirLinesTitle>
              </Grid>

              <Grid>
                <AirLinesLogo component="img" src={AlturaJet} />
              </Grid>

              <Grid item>
                <AirLinesButton
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="65f936161dec2e81acb9d54e"
                  onClick={handleChange}
                >
                  Select
                </AirLinesButton>
              </Grid>
            </Grid>
          </AirLineCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectFlight;
