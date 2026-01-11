// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import OptimizationBadge from './OptimizationBadge';

// types
import { TravelResult } from 'services/api';

// assets
import { Airplane } from 'iconsax-reactjs';

interface SingleResultProps {
  result: TravelResult;
}

const SingleResult: React.FC<SingleResultProps> = ({ result }) => {
  // Função para formatar valores monetários no padrão brasileiro
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Box>
      {/* Badge de Otimização */}
      {result.metadata && (
        <OptimizationBadge nivel={result.metadata.nivel_otimizacao} nota={result.metadata.nota} />
      )}

      <Grid container spacing={3}>
        {/* Resumo de Custos */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', backgroundColor: 'success.lighter' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                💰 Custo Total
              </Typography>
              <Typography variant="h2" color="success.main" sx={{ mb: 3, fontWeight: 700 }}>
                {formatCurrency(result.custos.total)}
              </Typography>

              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">✈️ Voos:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(result.custos.voos)}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">🏨 Hospedagem:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(result.custos.hospedagem)}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">🍽️ Alimentação:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(result.custos.alimentacao)}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">🚗 Transporte:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(result.custos.transporte)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Rota */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                🗺️ Roteiro
              </Typography>

              {/* Caminho da Rota */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap' }}>
                {result.rota.caminho.map((cidade, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      {cidade}
                    </Typography>
                    {index < result.rota.caminho.length - 1 && (
                      <Typography variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                        →
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Trechos Detalhados */}
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
                ✈️ Voos:
              </Typography>
              <Stack spacing={2}>
                {result.rota.trechos.map((trecho, index) => (
                  <Card key={index} variant="outlined" sx={{ backgroundColor: 'background.default' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                        <Box>
                          <Typography variant="h6" fontWeight={700}>
                            {trecho.origem} → {trecho.destino}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trecho.voo.cia} - {trecho.voo.codigo}
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="success.main" fontWeight={700}>
                          {formatCurrency(trecho.voo.preco)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="caption">📅 {trecho.voo.data}</Typography>
                        <Typography variant="caption">🕐 {trecho.voo.saida}</Typography>
                        {trecho.voo.duracao_min && (
                          <Typography variant="caption">⏱️ {trecho.voo.duracao_min} min</Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Detalhes de Hospedagem */}
        {result.detalhes.hospedagem.length > 0 && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  🏨 Hospedagem
                </Typography>
                <Stack spacing={1.5}>
                  {result.detalhes.hospedagem.map((hosp, index) => (
                    <Box key={index}>
                      <Typography variant="body2" fontWeight={600}>
                        {hosp.cidade}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {hosp.diarias} diárias × {formatCurrency(hosp.diaria)} = {formatCurrency(hosp.total)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Detalhes de Alimentação */}
        {result.detalhes.alimentacao.length > 0 && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  🍽️ Alimentação
                </Typography>
                <Stack spacing={1.5}>
                  {result.detalhes.alimentacao.map((alim, index) => (
                    <Box key={index}>
                      <Typography variant="body2" fontWeight={600}>
                        {alim.cidade}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alim.diarias} dias × {formatCurrency(alim.custo_dia)} = {formatCurrency(alim.total)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Detalhes de Transporte */}
        {result.detalhes.transporte.length > 0 && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  🚗 Transporte Local
                </Typography>
                <Stack spacing={1.5}>
                  {result.detalhes.transporte.map((transp, index) => (
                    <Box key={index}>
                      <Typography variant="body2" fontWeight={600}>
                        {transp.cidade}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transp.diarias} dias × {formatCurrency(transp.custo_dia)} = {formatCurrency(transp.total)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Tempo de Computação */}
      {result.metadata && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
          ⚡ Calculado em {result.metadata.tempo_computacao.toFixed(1)}s
        </Typography>
      )}
    </Box>
  );
};

export default SingleResult;
