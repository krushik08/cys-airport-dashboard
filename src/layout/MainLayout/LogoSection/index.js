import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
// import Logo from '../../../assets/images/logo1.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo">
        <Logo />
        {/* Nuclear Plant Model */}
        {/* <Box component={'img'} src={Logo} className="logo-style" /> */}
    </Link>
);

export default LogoSection;
