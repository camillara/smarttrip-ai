// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import ScoreBar from './ScoreBar';

// types
import { OpcaoViagem } from 'services/api';

// assets
import { Star } from 'iconsax-reactjs';

interface OptionComparisonProps {
  opcoes: OpcaoViagem[];
  recomendacao: number;
  onSelect: (opcao: OpcaoViagem) => void;
}

const OptionComparison: React.FC<OptionComparisonProps> = ({ opcoes, recomendacao, onSelect }) => {
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
    <Grid container spacing={3}>
      {opcoes.map((opcao) => {
        const isRecommended = opcao.id === recomendacao;

        return (
          <Grid size={{ xs: 12, md: 4 }} key={opcao.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: isRecommended ? '2px solid' : '1px solid',
                borderColor: isRecommended ? 'primary.main' : 'divider',
                backgroundColor: isRecommended ? 'primary.lighter' : 'background.paper',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => onSelect(opcao)}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Badge de Recomendação */}
                {isRecommended && (
                  <Chip
                    icon={<Star variant="Bold" size={16} />}
                    label="RECOMENDADA"
                    color="primary"
                    size="small"
                    sx={{ mb: 2, fontWeight: 700 }}
                  />
                )}

                {/* Título e Descrição */}
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                  {opcao.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {opcao.descricao}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Métricas Principais */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      💰 Custo Total:
                    </Typography>
                    <Typography variant="h5" color="success.main" fontWeight={700}>
                      {formatCurrency(opcao.custo_total)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={600}>
                      ⏱️ Tempo Viagem:
                    </Typography>
                    <Typography variant="body2">{opcao.tempo_total_viagem.toFixed(1)}h</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={600}>
                      ✈️ Escalas:
                    </Typography>
                    <Typography variant="body2">{opcao.numero_escalas}</Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Pontuações */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                    📊 Pontuação Geral: {opcao.pontuacao.geral.toFixed(1)}/10
                  </Typography>

                  <Stack spacing={1.5}>
                    <ScoreBar label="Custo" score={opcao.pontuacao.custo} />
                    <ScoreBar label="Tempo" score={opcao.pontuacao.tempo} />
                    <ScoreBar label="Conforto" score={opcao.pontuacao.conforto} />
                  </Stack>
                </Box>

                {/* Vantagens */}
                {opcao.vantagens.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main', display: 'block', mb: 0.5 }}>
                      ✅ Vantagens:
                    </Typography>
                    <Stack spacing={0.5}>
                      {opcao.vantagens.map((v, i) => (
                        <Typography key={i} variant="caption" color="success.dark" sx={{ pl: 1 }}>
                          • {v}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Desvantagens */}
                {opcao.desvantagens.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'warning.main', display: 'block', mb: 0.5 }}>
                      ⚠️ Desvantagens:
                    </Typography>
                    <Stack spacing={0.5}>
                      {opcao.desvantagens.map((d, i) => (
                        <Typography key={i} variant="caption" color="warning.dark" sx={{ pl: 1 }}>
                          • {d}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Botão de Seleção */}
                <Button
                  fullWidth
                  variant={isRecommended ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ py: 1.5, fontWeight: 700 }}
                >
                  Selecionar esta opção
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OptionComparison;
