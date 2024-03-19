import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SelectFlight = Loadable(lazy(() => import('pages/select-flight')));
const Pnr = Loadable(lazy(() => import('pages/pnr')));
const SelectPass = Loadable(lazy(() => import('pages/pass')));
const BoardingPass = Loadable(lazy(() => import('pages/boarding-pass')));
const BaggagePass = Loadable(lazy(() => import('pages/baggage-pass')));
const ThankYou = Loadable(lazy(() => import('pages/thank-you')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SelectFlight />
        },

        {
            path: '/select-flight',
            element: <SelectFlight />
        },

        {
            path: '/pnr',
            element: <Pnr />
        },
        {
            path: '/select-pass',
            element: <SelectPass />
        },
        {
            path: '/boarding-pass',
            element: <BoardingPass />
        },
        {
            path: '/baggage-pass',
            element: <BaggagePass />
        },
        {
            path: '/thank-you',
            element: <ThankYou />
        }
    ]
};

export default MainRoutes;
