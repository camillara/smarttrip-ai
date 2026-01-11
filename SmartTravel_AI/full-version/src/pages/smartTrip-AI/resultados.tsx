import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import { useTrip } from 'contexts/TripContext';
import SingleResult from 'components/smarttrip/SingleResult';
import OptionComparison from 'components/smarttrip/OptionComparison';

// types
import { OpcaoViagem } from 'services/api';

// assets
import { Airplane } from 'iconsax-reactjs';

// ==============================|| SMARTTRIP AI - RESULTADOS ||============================== //

export default function SmartTripResultados() {
  const navigate = useNavigate();
  const { result, multipleResult, searchMode } = useTrip();
  const [selectedOption, setSelectedOption] = useState<OpcaoViagem | null>(null);
  const [selectedVoltaOption, setSelectedVoltaOption] = useState<OpcaoViagem | null>(null);

  // Função para formatar valores monetários no padrão brasileiro
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Verificar se temos resultados
  const hasResults = result || multipleResult;

  if (!hasResults) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <MainCard>
            <Stack spacing={3} alignItems="center" sx={{ py: 8 }}>
              <Typography variant="h3" color="text.secondary">
                Nenhum resultado encontrado
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Você precisa fazer uma busca primeiro para visualizar os resultados.
              </Typography>
              <Button variant="contained" size="large" onClick={() => navigate('/viagens')}>
                Fazer Nova Busca
              </Button>
            </Stack>
          </MainCard>
        </Box>
      </Container>
    );
  }

  const handleSelectOption = (opcao: OpcaoViagem) => {
    setSelectedOption(opcao);
    // Scroll suave para detalhes
    setTimeout(() => {
      document.getElementById('selected-option-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectVoltaOption = (opcao: OpcaoViagem) => {
    setSelectedVoltaOption(opcao);
    // Scroll suave para detalhes
    setTimeout(() => {
      document.getElementById('selected-volta-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={1}>
                  <Typography variant="h2">
                    <Airplane variant="Bold" style={{ marginRight: 12, verticalAlign: 'middle' }} />
                    Resultados da Busca
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {searchMode === 'single' 
                      ? 'Melhor rota otimizada encontrada'
                      : 'Compare até 3 opções e escolha a ideal para você'}
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={() => navigate('/viagens')}
                >
                  Nova Busca
                </Button>
              </Stack>
            </MainCard>
          </Grid>

          {/* Resultados - Modo Single */}
          {result && searchMode === 'single' && (
            <>
              {/* Ida */}
              <Grid size={12}>
                <Typography variant="h3" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  ✈️ Viagem de Ida
                </Typography>
                <SingleResult result={result.ida} />
              </Grid>

              {/* Volta */}
              {result.volta && (
                <Grid size={12}>
                  <Typography variant="h3" sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    🔄 Viagem de Volta
                  </Typography>
                  <SingleResult result={result.volta} />
                </Grid>
              )}

              {/* Custo Total */}
              <Grid size={12}>
                <Alert severity="success" sx={{ mt: 4 }}>
                  <Typography variant="h5" fontWeight={700}>
                    💰 Custo Total da Viagem: {formatCurrency(result.ida.custos.total + (result.volta?.custos.total || 0))}
                  </Typography>
                </Alert>
              </Grid>

              {/* Botão para Dicas */}
              <Grid size={12}>
                <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/dicas')}
                    sx={{ px: 6, py: 1.5 }}
                  >
                    📝 Ver Dicas de Viagem
                  </Button>
                </Stack>
              </Grid>
            </>
          )}

          {/* Resultados - Modo Multiple */}
          {multipleResult && searchMode === 'multiple' && (
            <>
              {/* Opções de Ida */}
              <Grid size={12}>
                <Box sx={{ bgcolor: 'primary.lighter', borderLeft: '4px solid', borderColor: 'primary.main', p: 3, mb: 3, borderRadius: 1 }}>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    ✈️ Opções de Ida
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Analisamos diferentes combinações e selecionamos até 3 melhores rotas para você.
                    A opção marcada com ⭐ é a mais recomendada.
                  </Typography>
                </Box>
                
                <OptionComparison
                  opcoes={multipleResult.ida.opcoes}
                  recomendacao={multipleResult.ida.recomendacao}
                  onSelect={handleSelectOption}
                />

                {/* Detalhes da Opção Selecionada - Ida */}
                {selectedOption && (
                  <Box id="selected-option-details" sx={{ mt: 6 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                      📋 Detalhes da Opção Selecionada (Ida)
                    </Typography>
                    <SingleResult
                      result={{
                        rota: selectedOption.rota,
                        custos: selectedOption.custos,
                        detalhes: selectedOption.detalhes,
                        metadata: {
                          nivel_otimizacao: 'otima',
                          nota: selectedOption.titulo,
                          tempo_computacao: multipleResult.ida.metadata.tempo_computacao
                        }
                      }}
                    />
                  </Box>
                )}

                {/* Info do Tempo - Ida */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
                  ⚡ {multipleResult.ida.metadata.numero_opcoes_geradas} opções geradas em{' '}
                  {multipleResult.ida.metadata.tempo_computacao.toFixed(1)}s
                </Typography>
              </Grid>

              {/* Opções de Volta */}
              {multipleResult.volta && (
                <Grid size={12} sx={{ mt: 8 }}>
                  <Box sx={{ bgcolor: 'secondary.lighter', borderLeft: '4px solid', borderColor: 'secondary.main', p: 3, mb: 3, borderRadius: 1 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      🔄 Opções de Volta
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Escolha a melhor opção para sua viagem de retorno.
                    </Typography>
                  </Box>

                  <OptionComparison
                    opcoes={multipleResult.volta.opcoes}
                    recomendacao={multipleResult.volta.recomendacao}
                    onSelect={handleSelectVoltaOption}
                  />

                  {/* Detalhes da Opção Selecionada - Volta */}
                  {selectedVoltaOption && (
                    <Box id="selected-volta-details" sx={{ mt: 6 }}>
                      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                        📋 Detalhes da Opção Selecionada (Volta)
                      </Typography>
                      <SingleResult
                        result={{
                          rota: selectedVoltaOption.rota,
                          custos: selectedVoltaOption.custos,
                          detalhes: selectedVoltaOption.detalhes,
                          metadata: {
                            nivel_otimizacao: 'otima',
                            nota: selectedVoltaOption.titulo,
                            tempo_computacao: multipleResult.volta.metadata.tempo_computacao
                          }
                        }}
                      />
                    </Box>
                  )}

                  {/* Info do Tempo - Volta */}
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
                    ⚡ {multipleResult.volta.metadata.numero_opcoes_geradas} opções geradas em{' '}
                    {multipleResult.volta.metadata.tempo_computacao.toFixed(1)}s
                  </Typography>
                </Grid>
              )}

              {/* Custo Total Estimado */}
              {selectedOption && (
                <Grid size={12}>
                  <Alert severity="info" sx={{ mt: 6 }}>
                    <Typography variant="h5" fontWeight={700}>
                      💰 Custo Total Estimado:{' '}
                      {formatCurrency(selectedOption.custo_total + (selectedVoltaOption?.custo_total || 0))}
                    </Typography>
                    {!selectedVoltaOption && multipleResult.volta && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        * Selecione uma opção de volta para ver o custo total completo
                      </Typography>
                    )}
                  </Alert>
                </Grid>
              )}

              {/* Botão para Dicas */}
              {selectedOption && (!multipleResult.volta || selectedVoltaOption) && (
                <Grid size={12}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/dicas')}
                      sx={{ px: 6, py: 1.5 }}
                    >
                      📝 Ver Dicas de Viagem
                    </Button>
                  </Stack>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
