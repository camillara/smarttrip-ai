// material-ui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ScoreBarProps {
  label: string;
  score: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score }) => {
  const percentage = (score / 10) * 100;
  const getColor = () => {
    if (score >= 7) return 'success';
    if (score >= 5) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
          {score.toFixed(1)}/10
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getColor()}
        sx={{
          height: 8,
          borderRadius: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 1,
            transition: 'width 0.5s ease-out'
          }
        }}
      />
    </Box>
  );
};

export default ScoreBar;
