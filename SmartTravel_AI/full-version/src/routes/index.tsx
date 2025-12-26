import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project-imports
import Loadable from 'components/Loadable';
import SmartTripLayout from 'layout/Simple/SmartTripLayout';

// render - smarttrip pages
const SmartTripHome = Loadable(lazy(() => import('pages/smartTrip-AI')));
const SmartTripViagens = Loadable(lazy(() => import('pages/smartTrip-AI/viagens')));
const SmartTripResultados = Loadable(lazy(() => import('pages/smartTrip-AI/resultados')));
const SmartTripSobre = Loadable(lazy(() => import('pages/smartTrip-AI/sobre')));

// ==============================|| SMARTTRIP AI ROUTES ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SmartTripLayout />,
      children: [
        {
          index: true,
          element: <SmartTripHome />
        },
        {
          path: 'viagens',
          element: <SmartTripViagens />
        },
        {
          path: 'resultados',
          element: <SmartTripResultados />
        },
        {
          path: 'sobre',
          element: <SmartTripSobre />
        }
      ]
    }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
