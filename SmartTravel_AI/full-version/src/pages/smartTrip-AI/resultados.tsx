import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { Airplane, ArrowRight, Car, Cup, DollarCircle, Home, Location } from 'iconsax-reactjs';

// Interfaces baseadas no JSON retornado pelo backend
interface Voo {
  id: string;
  cia: string;
  codigo: string;
  data: string;
  saida: string;
  duracao_min: number | null;
  preco: number;
}

interface Trecho {
  origem: string;
  destino: string;
  voo: Voo;
}

interface Rota {
  origem: string;
  destino: string;
  caminho: string[];
  trechos: Trecho[];
}

interface DetalhesCidade {
  cidade: string;
  diarias: number;
  total: number;
}

interface DetalhesHospedagem extends DetalhesCidade {
  diaria: number;
}

interface DetalhesAlimentacao extends DetalhesCidade {
  custo_dia: number;
}

interface DetalhesTransporte extends DetalhesCidade {
  custo_dia: number;
}

interface Custos {
  total: number;
  voos: number;
  hospedagem: number;
  alimentacao: number;
  transporte: number;
}

interface Detalhes {
  hospedagem: DetalhesHospedagem[];
  alimentacao: DetalhesAlimentacao[];
  transporte: DetalhesTransporte[];
}

interface TravelResult {
  rota: Rota;
  custos: Custos;
  detalhes: Detalhes;
}

// Interface para resultado combinado (ida + volta)
interface CombinedTravelResult {
  ida: TravelResult;
  volta: TravelResult | null;
  custoTotal: number;
}

// Função para combinar resultados de ida e volta
const combineResults = (resultadoIda: TravelResult, resultadoVolta: TravelResult | null): CombinedTravelResult => {
  // Custo total = todos os custos da ida + apenas voos da volta
  const custoTotal = resultadoIda.custos.total + (resultadoVolta ? resultadoVolta.custos.voos : 0);

  return {
    ida: resultadoIda,
    volta: resultadoVolta,
    custoTotal
  };
};

// Dados mockados baseados no JSON real do backend
const mockResultIda: TravelResult = {
  rota: {
    origem: 'GYN',
    destino: 'ATL',
    caminho: ['GYN', 'GRU', 'JFK', 'ATL'],
    trechos: [
      {
        origem: 'GYN',
        destino: 'GRU',
        voo: {
          id: 'G31497_2026_03_07_06:15',
          cia: 'GOL',
          codigo: 'G31497',
          data: '2026-03-07',
          saida: '06:15',
          duracao_min: 120,
          preco: 450.0
        }
      },
      {
        origem: 'GRU',
        destino: 'JFK',
        voo: {
          id: 'AV248_2026_03_12_01:20',
          cia: 'Avianca',
          codigo: 'AV248',
          data: '2026-03-12',
          saida: '01:20',
          duracao_min: 600,
          preco: 2800.0
        }
      },
      {
        origem: 'JFK',
        destino: 'ATL',
        voo: {
          id: 'F94817_2026_03_16_06:00',
          cia: 'Frontier',
          codigo: 'F94817',
          data: '2026-03-16',
          saida: '06:00',
          duracao_min: 180,
          preco: 650.0
        }
      }
    ]
  },
  custos: {
    total: 6778.42,
    voos: 3900.0,
    hospedagem: 1938.32,
    alimentacao: 940.1,
    transporte: 0.0
  },
  detalhes: {
    hospedagem: [
      {
        cidade: 'GYN',
        diarias: 2,
        diaria: 70.0,
        total: 140.0
      },
      {
        cidade: 'GRU',
        diarias: 3,
        diaria: 147.0,
        total: 441.0
      },
      {
        cidade: 'ATL',
        diarias: 2,
        diaria: 678.66,
        total: 1357.32
      }
    ],
    alimentacao: [
      {
        cidade: 'GYN',
        diarias: 2,
        custo_dia: 60.0,
        total: 120.0
      },
      {
        cidade: 'GRU',
        diarias: 3,
        custo_dia: 90.5,
        total: 271.5
      },
      {
        cidade: 'ATL',
        diarias: 2,
        custo_dia: 274.3,
        total: 548.6
      }
    ],
    transporte: [
      {
        cidade: 'GYN',
        diarias: 2,
        custo_dia: 0.0,
        total: 0.0
      },
      {
        cidade: 'GRU',
        diarias: 3,
        custo_dia: 0.0,
        total: 0.0
      },
      {
        cidade: 'ATL',
        diarias: 2,
        custo_dia: 0.0,
        total: 0.0
      }
    ]
  }
};

// Mock da volta (apenas voos)
const mockResultVolta: TravelResult = {
  rota: {
    origem: 'ATL',
    destino: 'GYN',
    caminho: ['ATL', 'GYN'],
    trechos: [
      {
        origem: 'ATL',
        destino: 'GYN',
        voo: {
          id: 'G32198_2026_03_20_14:30',
          cia: 'GOL',
          codigo: 'G32198',
          data: '2026-03-20',
          saida: '14:30',
          duracao_min: 720,
          preco: 1850.0
        }
      }
    ]
  },
  custos: {
    total: 1850.0,
    voos: 1850.0,
    hospedagem: 0.0,
    alimentacao: 0.0,
    transporte: 0.0
  },
  detalhes: {
    hospedagem: [],
    alimentacao: [],
    transporte: []
  }
};

// Combinar resultados
const mockResult = combineResults(mockResultIda, mockResultVolta);

// Mapa de nomes de cidades
const CIDADE_NOMES: Record<string, string> = {
  GYN: 'Goiânia',
  GRU: 'São Paulo',
  BSB: 'Brasília',
  ATL: 'Atlanta',
  ORD: 'Chicago',
  MSY: 'New Orleans',
  MIA: 'Miami',
  JFK: 'Nova York'
};

// ==============================|| SMARTTRIP AI - RESULTADOS ||============================== //

export default function SmartTripResultados() {
  const navigate = useNavigate();

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDuracao = (minutos: number | null) => {
    if (!minutos) return 'N/A';
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}m`;
  };

  const getCidadeNome = (codigo: string) => {
    return CIDADE_NOMES[codigo] || codigo;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          {/* Header */}
          <Grid size={12}>
            <MainCard
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h2">
                  <Airplane variant="Bold" style={{ marginRight: 12, verticalAlign: 'middle' }} />
                  {mockResult.volta ? 'Rotas de Ida e Volta' : 'Melhor Rota Encontrada'}
                </Typography>
                
                {/* Rota de Ida */}
                <Stack spacing={1}>
                  <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Airplane variant="Bold" size={20} />
                    Ida: {getCidadeNome(mockResult.ida?.rota?.origem || '')} → {getCidadeNome(mockResult.ida?.rota?.destino || '')}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    {mockResult.ida?.rota?.caminho?.map((cidade, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={getCidadeNome(cidade)}
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                        />
                        {index < (mockResult.ida?.rota?.caminho?.length || 0) - 1 && (
                          <ArrowRight size={20} style={{ color: 'white' }} />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Stack>

                {/* Rota de Volta (se existir) */}
                {mockResult.volta && (
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Airplane variant="Bold" size={20} style={{ transform: 'rotate(180deg)' }} />
                      Volta: {getCidadeNome(mockResult.volta.rota.origem)} → {getCidadeNome(mockResult.volta.rota.destino)}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      {mockResult.volta.rota.caminho.map((cidade, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={getCidadeNome(cidade)}
                            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 'bold' }}
                          />
                          {index < mockResult.volta.rota.caminho.length - 1 && (
                            <ArrowRight size={20} style={{ color: 'white' }} />
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </MainCard>
          </Grid>

          {/* Resumo de Custos */}
          <Grid size={12}>
            <MainCard title="💰 Resumo de Custos" secondary={<DollarCircle variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Paper elevation={0} sx={{ p: 3, bgcolor: 'success.lighter', textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main">
                      {formatCurrency(mockResult.custoTotal)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Custo Total {mockResult.volta ? '(Ida + Volta)' : ''}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Airplane size={20} />
                        <Typography variant="body1">
                          Voos {mockResult.volta ? '(Ida + Volta)' : ''}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" color="text.primary">
                        {formatCurrency((mockResult.ida?.custos?.voos || 0) + (mockResult.volta?.custos?.voos || 0))}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Home size={20} />
                        <Typography variant="body1">Hospedagem</Typography>
                      </Stack>
                      <Typography variant="h6" color={(mockResult.ida?.custos?.hospedagem || 0) > 0 ? 'text.primary' : 'text.secondary'}>
                        {formatCurrency(mockResult.ida?.custos?.hospedagem || 0)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Cup size={20} />
                        <Typography variant="body1">Alimentação</Typography>
                      </Stack>
                      <Typography variant="h6" color={(mockResult.ida?.custos?.alimentacao || 0) > 0 ? 'text.primary' : 'text.secondary'}>
                        {formatCurrency(mockResult.ida?.custos?.alimentacao || 0)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Car size={20} />
                        <Typography variant="body1">Transporte Local</Typography>
                      </Stack>
                      <Typography variant="h6" color={(mockResult.ida?.custos?.transporte || 0) > 0 ? 'text.primary' : 'text.secondary'}>
                        {formatCurrency(mockResult.ida?.custos?.transporte || 0)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Trechos de Voo */}
          <Grid size={12}>
            <MainCard title="✈️ Trechos da Viagem" secondary={<Airplane variant="Bold" />}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Trecho</strong></TableCell>
                      <TableCell><strong>Voo</strong></TableCell>
                      <TableCell><strong>Data/Hora</strong></TableCell>
                      <TableCell><strong>Duração</strong></TableCell>
                      <TableCell align="right"><strong>Preço</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Trechos de Ida */}
                    {mockResult.ida?.rota?.trechos?.map((trecho, index) => (
                      <TableRow key={`ida-${index}`}>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label="IDA" size="small" color="primary" variant="outlined" />
                            <Typography variant="body2" fontWeight="bold">
                              {getCidadeNome(trecho.origem)}
                            </Typography>
                            <ArrowRight size={16} />
                            <Typography variant="body2" fontWeight="bold">
                              {getCidadeNome(trecho.destino)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{trecho.voo.cia || 'N/A'}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {trecho.voo.codigo || trecho.voo.id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{trecho.voo.data || 'N/A'}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {trecho.voo.saida || 'N/A'}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">{formatDuracao(trecho.voo.duracao_min)}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(trecho.voo.preco || 0)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {/* Trechos de Volta (se existir) */}
                    {mockResult.volta?.rota.trechos.map((trecho, index) => (
                      <TableRow key={`volta-${index}`} sx={{ bgcolor: 'secondary.lighter' }}>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label="VOLTA" size="small" color="secondary" variant="outlined" />
                            <Typography variant="body2" fontWeight="bold">
                              {getCidadeNome(trecho.origem)}
                            </Typography>
                            <ArrowRight size={16} />
                            <Typography variant="body2" fontWeight="bold">
                              {getCidadeNome(trecho.destino)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{trecho.voo.cia || 'N/A'}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {trecho.voo.codigo || trecho.voo.id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{trecho.voo.data || 'N/A'}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {trecho.voo.saida || 'N/A'}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">{formatDuracao(trecho.voo.duracao_min)}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(trecho.voo.preco || 0)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>

          {/* Detalhes por Cidade - Hospedagem */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MainCard title="🏨 Hospedagem" secondary={<Home variant="Bold" />}>
              <Stack spacing={2}>
                {mockResult.ida?.detalhes?.hospedagem?.map((item, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{getCidadeNome(item.cidade)}</Typography>
                      <Chip label={`${item.diarias} ${item.diarias === 1 ? 'diária' : 'diárias'}`} size="small" color="primary" />
                    </Stack>
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Diária:
                        </Typography>
                        <Typography variant="body2">{formatCurrency(item.diaria)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                          Total:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          {formatCurrency(item.total)}
                        </Typography>
                      </Box>
                    </Stack>
                    {index < (mockResult.ida?.detalhes?.hospedagem?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
                {(!mockResult.ida?.detalhes?.hospedagem || mockResult.ida.detalhes.hospedagem.length === 0) && (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Nenhuma hospedagem incluída
                  </Typography>
                )}
              </Stack>
            </MainCard>
          </Grid>

          {/* Detalhes por Cidade - Alimentação */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MainCard title="🍽️ Alimentação" secondary={<Cup variant="Bold" />}>
              <Stack spacing={2}>
                {mockResult.ida?.detalhes?.alimentacao?.map((item, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{getCidadeNome(item.cidade)}</Typography>
                      <Chip label={`${item.diarias} ${item.diarias === 1 ? 'dia' : 'dias'}`} size="small" color="warning" />
                    </Stack>
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Por dia:
                        </Typography>
                        <Typography variant="body2">{formatCurrency(item.custo_dia)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                          Total:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          {formatCurrency(item.total)}
                        </Typography>
                      </Box>
                    </Stack>
                    {index < (mockResult.ida?.detalhes?.alimentacao?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
                {(!mockResult.ida?.detalhes?.alimentacao || mockResult.ida.detalhes.alimentacao.length === 0) && (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Nenhuma alimentação incluída
                  </Typography>
                )}
              </Stack>
            </MainCard>
          </Grid>

          {/* Detalhes por Cidade - Transporte */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MainCard title="🚗 Transporte Local" secondary={<Car variant="Bold" />}>
              <Stack spacing={2}>
                {mockResult.ida?.detalhes?.transporte?.map((item, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{getCidadeNome(item.cidade)}</Typography>
                      <Chip label={`${item.diarias} ${item.diarias === 1 ? 'dia' : 'dias'}`} size="small" color="info" />
                    </Stack>
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Por dia:
                        </Typography>
                        <Typography variant="body2">{formatCurrency(item.custo_dia)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                          Total:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color={item.total > 0 ? 'success.main' : 'text.secondary'}>
                          {formatCurrency(item.total)}
                        </Typography>
                      </Box>
                    </Stack>
                    {index < (mockResult.ida?.detalhes?.transporte?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
                {(!mockResult.ida?.detalhes?.transporte || mockResult.ida.detalhes.transporte.length === 0) && (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Nenhum transporte local incluído
                  </Typography>
                )}
              </Stack>
            </MainCard>
          </Grid>

          {/* Ações */}
          <Grid size={12}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="outlined" size="large" onClick={() => navigate('/viagens')}>
                Nova Busca
              </Button>
              <Button variant="contained" size="large" color="success" sx={{ px: 6 }} onClick={() => navigate('/dicas')}>
                Confirmar e Prosseguir
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
