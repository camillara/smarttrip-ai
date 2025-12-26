// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { Airplane, Location, Clock, DollarCircle, Star } from 'iconsax-reactjs';

// types
interface StepInfo {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ==============================|| SMARTTRIP AI - HOME ||============================== //

export default function SmartTripHome() {
  const steps: StepInfo[] = [
    {
      number: '1',
      title: 'Defina sua viagem',
      description: 'Informe a data de ida, local de partida, destino, data de retorno e, se desejar, uma cidade diferente para o retorno.',
      icon: <Location variant="Bold" size={32} />
    },
    {
      number: '2',
      title: 'Personalize suas preferências',
      description: 'Escolha os critérios mais importantes para você, como menor custo, menor tempo de viagem ou melhor equilíbrio entre conforto e preço.',
      icon: <Star variant="Bold" size={32} />
    },
    {
      number: '3',
      title: 'Processamento inteligente',
      description:
        'O SmartTrip AI analisa as combinações possíveis de voo, hospedagem, transporte e alimentação, aplicando modelos de otimização para avaliar cada alternativa.',
      icon: <Airplane variant="Bold" size={32} />
    },
    {
      number: '4',
      title: 'Receba a melhor recomendação',
      description:
        'A plataforma apresenta as opções mais vantajosas, explicando o porquê de cada escolha com base nos critérios definidos.',
      icon: <DollarCircle variant="Bold" size={32} />
    },
    {
      number: '5',
      title: 'Compare e decida',
      description: 'Visualize diferentes cenários e selecione a opção que melhor atende às suas necessidades.',
      icon: <Clock variant="Bold" size={32} />
    }
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={GRID_COMMON_SPACING}>
        {/* Hero Section com imagem de fundo */}
        <Grid size={12}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              height: { xs: 400, md: 500 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
              }
            }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center" sx={{ position: 'relative', zIndex: 1, px: 3, color: 'white' }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 700 }}>
                SmartTrip AI
              </Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', md: '1.8rem' }, fontWeight: 400, opacity: 0.95 }}>
                Planejamento Inteligente de Viagens
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 800, fontSize: { xs: '1rem', md: '1.1rem' }, opacity: 0.9 }}>
                Encontre o melhor custo-benefício em deslocamentos complexos usando Inteligência Artificial e Otimização
              </Typography>
              <Button
                component={RouterLink}
                to="/viagens"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                Começar Agora
              </Button>
            </Stack>
          </Box>
        </Grid>

        {/* Seção de Descrição */}
        <Grid size={12}>
          <MainCard sx={{ mt: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h3" textAlign="center" color="primary">
                O que é o SmartTrip AI?
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ mx: 'auto' }}>
                SmartTrip AI é uma plataforma inteligente de planejamento de viagens que utiliza técnicas de Inteligência Artificial e
                Otimização para encontrar o melhor custo-benefício em deslocamentos complexos. A aplicação integra informações de
                passagens aéreas, hospedagem, aluguel de veículos e alimentação, considerando múltiplos critérios como custo total,
                tempo de viagem, conforto e flexibilidade de rotas.
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ mx: 'auto' }}>
                A solução é especialmente adequada para cenários em que o usuário precisa tomar decisões estratégicas, como grandes
                eventos, viagens internacionais ou roteiros com múltiplas cidades, oferecendo recomendações personalizadas e
                eficientes.
              </Typography>
            </Stack>
          </MainCard>
        </Grid>

        {/* Seção Como Funciona */}
        <Grid size={12}>
          <MainCard title="Como funciona o SmartTrip AI" sx={{ mt: 4 }}>
            <Grid container spacing={GRID_COMMON_SPACING}>
              {steps.map((step, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            mb: 1
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography variant="h5" color="primary">
                          {step.number}. {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </MainCard>
        </Grid>

        {/* Seção de Recursos */}
        <Grid size={12}>
          <MainCard title="Recursos Principais" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={GRID_COMMON_SPACING}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Typography variant="h5" color="primary">
                    Otimização Inteligente
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Algoritmos avançados analisam milhares de combinações para encontrar a melhor solução considerando todos os seus
                    critérios.
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Typography variant="h5" color="primary">
                    Múltiplos Critérios
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Considere custo, tempo, conforto e flexibilidade simultaneamente para tomar a melhor decisão.
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Typography variant="h5" color="primary">
                    Comparação Detalhada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Visualize diferentes cenários lado a lado e entenda o impacto de cada escolha no resultado final.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
}
