// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface OptimizationBadgeProps {
  nivel: 'otima' | 'boa' | 'viavel' | 'basica' | 'erro';
  nota: string;
}

const OptimizationBadge: React.FC<OptimizationBadgeProps> = ({ nivel, nota }) => {
  const badges = {
    otima: {
      color: '#4caf50',
      bgColor: '#e8f5e9',
      icon: '⭐⭐⭐⭐⭐',
      text: 'Solução Ótima',
      description: 'Melhor resultado possível'
    },
    boa: {
      color: '#2196f3',
      bgColor: '#e3f2fd',
      icon: '⭐⭐⭐⭐',
      text: 'Solução Relaxada',
      description: 'Excelente resultado'
    },
    viavel: {
      color: '#ff9800',
      bgColor: '#fff3e0',
      icon: '⭐⭐⭐',
      text: 'Solução Viável',
      description: 'Resultado aproximado'
    },
    basica: {
      color: '#ff5722',
      bgColor: '#fbe9e7',
      icon: '⭐⭐',
      text: 'Solução Básica',
      description: 'Rota simplificada'
    },
    erro: {
      color: '#f44336',
      bgColor: '#ffebee',
      icon: '⚠️',
      text: 'Sem Solução',
      description: 'Nenhum voo disponível'
    }
  };

  const badge = badges[nivel];

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 3,
        mb: 3,
        backgroundColor: badge.bgColor,
        border: `2px solid ${badge.color}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 4px 12px ${badge.color}40`
        }
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h2" sx={{ fontSize: '2rem' }}>
          {badge.icon}
        </Typography>
        <Box>
          <Typography variant="h4" sx={{ color: badge.color, fontWeight: 700 }}>
            {badge.text}
          </Typography>
          <Typography variant="body2" sx={{ color: badge.color, opacity: 0.9 }}>
            {badge.description}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
        {nota}
      </Typography>
    </Box>
  );
};

export default OptimizationBadge;
