import { cloneElement, ReactElement, CSSProperties } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// assets
import { Airplane } from 'iconsax-reactjs';

interface ElevationScrollProps {
  children: ReactElement<{ style?: CSSProperties }>;
  window?: () => Window;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| SMARTTRIP - HEADER ||============================== //

export default function SmartTripHeader() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <ElevationScroll>
      <AppBar
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: 'blur(8px)',
          color: 'text.primary',
          boxShadow: 'none'
        })}
      >
        <Container maxWidth="xl" disableGutters={downMD}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1.5 }}>
            {/* Logo */}
            <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1 }}>
              <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <Airplane variant="Bold" size={24} />
                </Box>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  SmartTrip AI
                </Typography>
              </Link>
            </Stack>

            {/* Menu */}
            <Stack
              direction="row"
              sx={{
                gap: { xs: 2, md: 4 },
                alignItems: 'center',
                '& .header-link': {
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '&:hover': { color: 'primary.main' }
                }
              }}
            >
              <Link className="header-link" color="text.primary" component={RouterLink} to="/" underline="none">
                Home
              </Link>
              <Link className="header-link" color="text.primary" component={RouterLink} to="/viagens" underline="none">
                Viagens
              </Link>
              <Link className="header-link" color="text.primary" component={RouterLink} to="/sobre" underline="none">
                Sobre
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
