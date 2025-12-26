import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project-imports
import Loader from 'components/Loader';
import SmartTripHeader from './SmartTripHeader';
import SmartTripFooter from './SmartTripFooter';
import Box from '@mui/material/Box';

// ==============================|| LAYOUT - SMARTTRIP AI ||============================== //

export default function SmartTripLayout() {
  return (
    <Suspense fallback={<Loader />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SmartTripHeader />
        <Box sx={{ flexGrow: 1, pt: 10 }}>
          <Outlet />
        </Box>
        <SmartTripFooter />
      </Box>
    </Suspense>
  );
}
