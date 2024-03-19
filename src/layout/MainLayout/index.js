import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import Header from './Header';

import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, layout }) => ({
    ...theme.typography.mainContent,
    background: '#f0f0f0',
    borderRadius: 0,
    // borderBottomRightRadius: 0,
    ...(!open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter + 200
        }),
        [theme.breakpoints.up('md')]: {
            // marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
            marginRight: 0,

            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 68 : 68
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
        // marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
        marginRight: 0,

        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 68 : 68,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('md')]: {
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 68 : 68
        }
    }),
    [theme.breakpoints.down('md')]: {
        // marginLeft: '20px',
        marginRight: 0,

        padding: '16px',
        marginTop: 68,
        ...(!open && {
            width: `calc(100% - ${drawerWidth}px)`
        })
    },
    [theme.breakpoints.down('sm')]: {
        // marginLeft: '10px',
        marginRight: 0,

        // marginRight: '10px',
        padding: '16px',
        marginTop: 68,
        ...(!open && {
            width: `calc(100% - ${drawerWidth}px)`
        })
    }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { drawerType, container, layout } = useConfig();

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true));
        } else {
            dispatch(openDrawer(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerType]);

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (matchDownMd) {
            dispatch(openDrawer(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

    const header = useMemo(
        () => (
            <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
                <Header />
            </Toolbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [layout, matchDownMd]
    );

    return (
        <Box sx={{ display: 'flex', maxHeight: '100vh' }}>
            <CssBaseline />
            {/* header */}
            <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'red', display: 'none' }}>
                {header}
            </AppBar>

            {/* main content */}
            <Main theme={theme} sx={{ maxHeight: '100vh', overflow: 'auto' }} open={drawerOpen} layout={layout}>
                <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
                    <Outlet />
                </Container>
            </Main>
        </Box>
    );
};

export default MainLayout;
