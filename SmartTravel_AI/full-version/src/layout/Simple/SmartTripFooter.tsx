// material-ui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ==============================|| SMARTTRIP - FOOTER ||============================== //

export default function SmartTripFooter() {
  return (
    <Box sx={{ py: 4, bgcolor: 'secondary.200', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
      <Container>
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            SmartTrip AI © 2025
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Plataforma inteligente de otimização de viagens
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Projeto acadêmico da Especialização em Inteligência Artificial Aplicada — IFG
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
