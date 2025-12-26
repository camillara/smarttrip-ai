import { useState } from 'react';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { Airplane, ArrowDown2, ArrowUp2, Car, Clock, DollarCircle, Home, TickCircle, Star1 } from 'iconsax-reactjs';

interface TravelOption {
  id: number;
  score: number;
  custo_total: number;
  tempo_total: number;
  nivel_conforto: string;
  voo: {
    companhia: string;
    ida: {
      origem: string;
      destino: string;
      horario_saida: string;
      horario_chegada: string;
      duracao: string;
      preco: number;
      classe: string;
    };
    volta: {
      origem: string;
      destino: string;
      horario_saida: string;
      horario_chegada: string;
      duracao: string;
      preco: number;
      classe: string;
    };
  };
  hospedagem: {
    nome: string;
    categoria: number;
    preco_total: number;
    preco_diaria: number;
    localizacao: string;
  };
  carro?: {
    tipo: string;
    empresa: string;
    preco_total: number;
    preco_diaria: number;
  };
  alimentacao: {
    preco_total: number;
    nivel: string;
  };
}

// Dados mockados para demonstração
const mockResults: TravelOption[] = [
  {
    id: 1,
    score: 95,
    custo_total: 8500,
    tempo_total: 18,
    nivel_conforto: 'Alto',
    voo: {
      companhia: 'LATAM',
      ida: {
        origem: 'GYN',
        destino: 'RIO',
        horario_saida: '08:00',
        horario_chegada: '10:30',
        duracao: '2h 30m',
        preco: 1200,
        classe: 'Econômica'
      },
      volta: {
        origem: 'RIO',
        destino: 'GYN',
        horario_saida: '18:00',
        horario_chegada: '20:30',
        duracao: '2h 30m',
        preco: 1300,
        classe: 'Econômica'
      }
    },
    hospedagem: {
      nome: 'Copacabana Palace',
      categoria: 5,
      preco_total: 4500,
      preco_diaria: 300,
      localizacao: 'Copacabana'
    },
    carro: {
      tipo: 'Sedan',
      empresa: 'Localiza',
      preco_total: 900,
      preco_diaria: 60
    },
    alimentacao: {
      preco_total: 600,
      nivel: 'Médio'
    }
  },
  {
    id: 2,
    score: 88,
    custo_total: 6200,
    tempo_total: 20,
    nivel_conforto: 'Médio',
    voo: {
      companhia: 'GOL',
      ida: {
        origem: 'GYN',
        destino: 'RIO',
        horario_saida: '14:00',
        horario_chegada: '16:45',
        duracao: '2h 45m',
        preco: 900,
        classe: 'Econômica'
      },
      volta: {
        origem: 'RIO',
        destino: 'GYN',
        horario_saida: '20:00',
        horario_chegada: '22:45',
        duracao: '2h 45m',
        preco: 950,
        classe: 'Econômica'
      }
    },
    hospedagem: {
      nome: 'Ibis Copacabana',
      categoria: 3,
      preco_total: 3000,
      preco_diaria: 200,
      localizacao: 'Copacabana'
    },
    carro: {
      tipo: 'Econômico',
      empresa: 'Movida',
      preco_total: 750,
      preco_diaria: 50
    },
    alimentacao: {
      preco_total: 600,
      nivel: 'Médio'
    }
  },
  {
    id: 3,
    score: 82,
    custo_total: 4800,
    tempo_total: 22,
    nivel_conforto: 'Básico',
    voo: {
      companhia: 'Azul',
      ida: {
        origem: 'GYN',
        destino: 'RIO',
        horario_saida: '06:00',
        horario_chegada: '08:50',
        duracao: '2h 50m',
        preco: 750,
        classe: 'Econômica'
      },
      volta: {
        origem: 'RIO',
        destino: 'GYN',
        horario_saida: '22:00',
        horario_chegada: '00:50',
        duracao: '2h 50m',
        preco: 800,
        classe: 'Econômica'
      }
    },
    hospedagem: {
      nome: 'Hotel Atlântico Sul',
      categoria: 2,
      preco_total: 2100,
      preco_diaria: 140,
      localizacao: 'Centro'
    },
    carro: {
      tipo: 'Econômico',
      empresa: 'Unidas',
      preco_total: 600,
      preco_diaria: 40
    },
    alimentacao: {
      preco_total: 550,
      nivel: 'Básico'
    }
  }
];

// ==============================|| SMARTTRIP AI - RESULTADOS ||============================== //

export default function SmartTripResultados() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpandClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getConfortoColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'alto':
        return 'success';
      case 'médio':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          {/* Header com Resumo */}
          <Grid size={12}>
            <MainCard
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h2">
                  <Airplane variant="Bold" style={{ marginRight: 12, verticalAlign: 'middle' }} />
                  Resultados da Busca
                </Typography>
                <Typography variant="body1">
                  Encontramos {mockResults.length} opções otimizadas para sua viagem. As opções estão ordenadas por melhor
                  custo-benefício considerando seus critérios.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip label="GYN → RIO" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label="15 dias" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label="2 viajantes" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                </Stack>
              </Stack>
            </MainCard>
          </Grid>

          {/* Lista de Resultados */}
          {mockResults.map((option, index) => (
            <Grid size={12} key={option.id}>
              <Card
                sx={{
                  border: index === 0 ? '2px solid' : '1px solid',
                  borderColor: index === 0 ? 'success.main' : 'divider',
                  position: 'relative'
                }}
              >
                {index === 0 && (
                  <Chip
                    label="MELHOR OPÇÃO"
                    color="success"
                    size="small"
                    icon={<TickCircle variant="Bold" />}
                    sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
                  />
                )}

                <CardContent>
                  <Grid container spacing={3}>
                    {/* Score e Informações Principais */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={2} alignItems="center" textAlign="center">
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                          <Box
                            sx={{
                              width: 100,
                              height: 100,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: `${getScoreColor(option.score)}.lighter`,
                              border: 3,
                              borderColor: `${getScoreColor(option.score)}.main`
                            }}
                          >
                            <Typography variant="h2" color={`${getScoreColor(option.score)}.main`}>
                              {option.score}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" color="text.secondary">
                          Score de Otimização
                        </Typography>
                      </Stack>
                    </Grid>

                    {/* Informações Resumidas */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        {/* Custo */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <DollarCircle variant="Bold" size={24} style={{ color: '#00C853' }} />
                          <Box>
                            <Typography variant="h4">R$ {option.custo_total.toLocaleString('pt-BR')}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Custo Total
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Tempo */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Clock variant="Bold" size={24} style={{ color: '#2196F3' }} />
                          <Box>
                            <Typography variant="h5">{option.tempo_total}h de viagem total</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Tempo em deslocamento
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Conforto */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Star1 variant="Bold" size={24} style={{ color: '#FF9800' }} />
                          <Box>
                            <Chip label={`Conforto ${option.nivel_conforto}`} color={getConfortoColor(option.nivel_conforto)} size="small" />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              Classe {option.voo.ida.classe} • Hotel {option.hospedagem.categoria}★
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>

                    {/* Destaques */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1.5}>
                        <Typography variant="h6" color="text.secondary">
                          Destaques
                        </Typography>
                        <Stack spacing={1}>
                          <Chip icon={<Airplane size={16} />} label={option.voo.companhia} size="small" variant="outlined" />
                          <Chip icon={<Home size={16} />} label={option.hospedagem.nome} size="small" variant="outlined" />
                          {option.carro && (
                            <Chip icon={<Car size={16} />} label={`${option.carro.tipo} - ${option.carro.empresa}`} size="small" variant="outlined" />
                          )}
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />

                {/* Detalhes Expandíveis */}
                <CardActions sx={{ justifyContent: 'space-between', px: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<TickCircle />}
                    sx={{ px: 4 }}
                  >
                    Escolher Esta Opção
                  </Button>
                  <Button
                    endIcon={expandedId === option.id ? <ArrowUp2 /> : <ArrowDown2 />}
                    onClick={() => handleExpandClick(option.id)}
                  >
                    {expandedId === option.id ? 'Ocultar Detalhes' : 'Ver Detalhes Completos'}
                  </Button>
                </CardActions>

                <Collapse in={expandedId === option.id} timeout="auto" unmountOnExit>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* Voos */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <MainCard title="✈️ Voos" border>
                          <Stack spacing={3}>
                            {/* Ida */}
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                Ida
                              </Typography>
                              <Stack spacing={1}>
                                <Typography variant="body2">
                                  <strong>Rota:</strong> {option.voo.ida.origem} → {option.voo.ida.destino}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Horário:</strong> {option.voo.ida.horario_saida} - {option.voo.ida.horario_chegada}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Duração:</strong> {option.voo.ida.duracao}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Preço:</strong> R$ {option.voo.ida.preco.toLocaleString('pt-BR')}
                                </Typography>
                              </Stack>
                            </Box>

                            {/* Volta */}
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                Volta
                              </Typography>
                              <Stack spacing={1}>
                                <Typography variant="body2">
                                  <strong>Rota:</strong> {option.voo.volta.origem} → {option.voo.volta.destino}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Horário:</strong> {option.voo.volta.horario_saida} - {option.voo.volta.horario_chegada}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Duração:</strong> {option.voo.volta.duracao}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Preço:</strong> R$ {option.voo.volta.preco.toLocaleString('pt-BR')}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </MainCard>
                      </Grid>

                      {/* Hospedagem e Extras */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                          {/* Hospedagem */}
                          <MainCard title="🏨 Hospedagem" border>
                            <Stack spacing={1}>
                              <Typography variant="body2">
                                <strong>Hotel:</strong> {option.hospedagem.nome}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Categoria:</strong> {option.hospedagem.categoria} Estrelas
                              </Typography>
                              <Typography variant="body2">
                                <strong>Localização:</strong> {option.hospedagem.localizacao}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Diária:</strong> R$ {option.hospedagem.preco_diaria.toLocaleString('pt-BR')}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Total:</strong> R$ {option.hospedagem.preco_total.toLocaleString('pt-BR')}
                              </Typography>
                            </Stack>
                          </MainCard>

                          {/* Carro */}
                          {option.carro && (
                            <MainCard title="🚗 Transporte" border>
                              <Stack spacing={1}>
                                <Typography variant="body2">
                                  <strong>Tipo:</strong> {option.carro.tipo}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Empresa:</strong> {option.carro.empresa}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Diária:</strong> R$ {option.carro.preco_diaria.toLocaleString('pt-BR')}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Total:</strong> R$ {option.carro.preco_total.toLocaleString('pt-BR')}
                                </Typography>
                              </Stack>
                            </MainCard>
                          )}

                          {/* Alimentação */}
                          <MainCard title="🍽️ Alimentação" border>
                            <Stack spacing={1}>
                              <Typography variant="body2">
                                <strong>Nível:</strong> {option.alimentacao.nivel}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Total:</strong> R$ {option.alimentacao.preco_total.toLocaleString('pt-BR')}
                              </Typography>
                            </Stack>
                          </MainCard>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
