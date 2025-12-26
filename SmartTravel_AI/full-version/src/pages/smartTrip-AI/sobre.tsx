// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// ==============================|| SMARTTRIP AI - SOBRE ||============================== //

export default function SmartTripSobre() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={12}>
            <MainCard>
              <Stack spacing={3}>
                <Typography variant="h2" color="primary">
                  Sobre o SmartTrip AI
                </Typography>

                <Typography variant="h4" color="text.secondary">
                  Projeto Acadêmico
                </Typography>
                <Typography variant="body1">
                  O SmartTrip AI é um projeto desenvolvido como parte da Especialização em Inteligência Artificial Aplicada do
                  Instituto Federal de Goiás (IFG). O objetivo é aplicar técnicas avançadas de IA e otimização para resolver problemas
                  complexos de planejamento de viagens.
                </Typography>

                <Typography variant="h4" color="text.secondary">
                  Tecnologias Utilizadas
                </Typography>
                <Typography variant="body1">
                  A plataforma utiliza algoritmos de otimização combinatória, aprendizado de máquina e processamento de linguagem
                  natural para analisar e recomendar as melhores opções de viagem. O sistema considera múltiplos fatores
                  simultaneamente, incluindo custos, tempo, conforto e preferências pessoais.
                </Typography>

                <Typography variant="h4" color="text.secondary">
                  Equipe
                </Typography>
                <Typography variant="body1">
                  <strong>Alunos:</strong>
                  <br />
                  Camilla Rodrigues, Marcelo Carboni, Raquel Pereira e Renato Milhomem.
                </Typography>
                <Typography variant="body1">
                  <strong>Orientação:</strong>
                  <br />
                  Prof. Dr. Eduardo Noronha
                  <br />
                  Disciplina de Modelagem e Otimização Aplicada
                </Typography>

                <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    SmartTrip AI © 2025 | Projeto acadêmico da Especialização em Inteligência Artificial Aplicada — IFG
                  </Typography>
                </Box>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
