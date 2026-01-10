import { useNavigate } from 'react-router-dom';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import {
  Airplane,
  TickCircle,
  ShieldTick,
  BagTick,
  Warning2,
  Document,
  Health,
  MoneyForbidden,
  InfoCircle
} from 'iconsax-reactjs';

// ==============================|| SMARTTRIP AI - DICAS DE VIAGEM ||============================== //

export default function SmartTripDicas() {
  const navigate = useNavigate();

  const itensMala = [
    'Roupas adequadas ao clima do destino',
    'Documentos pessoais (originais e cópias)',
    'Carregadores e adaptadores de tomada',
    'Medicamentos de uso contínuo e receitas',
    'Artigos de higiene pessoal',
    'Dinheiro em espécie e cartões',
    'Protetor solar e óculos de sol',
    'Kit de primeiros socorros básico'
  ];

  const documentosNecessarios = [
    'Passaporte válido (com pelo menos 6 meses de validade)',
    'Visto (se necessário para o país de destino)',
    'Carteira de vacinação internacional',
    'Cartão de seguro viagem',
    'Comprovante de hospedagem',
    'Passagens aéreas (ida e volta)',
    'CPF e RG',
    'CNH internacional (se for alugar veículo)'
  ];

  const vacinasComuns = [
    'Febre Amarela (obrigatória para alguns países)',
    'COVID-19 (verificar requisitos do país)',
    'Hepatite A e B',
    'Tétano',
    'Febre Tifoide',
    'Raiva (para áreas rurais)',
    'Consulte sempre o Ministério da Saúde antes de viajar'
  ];

  const itensProibidos = [
    'Líquidos acima de 100ml na bagagem de mão',
    'Objetos cortantes e perfurantes',
    'Armas de fogo e munições (sem autorização)',
    'Substâncias inflamáveis e explosivas',
    'Baterias de lítio soltas (devem estar em equipamentos)',
    'Alimentos perecíveis em voos internacionais',
    'Produtos químicos e tóxicos',
    'Medicamentos sem receita (em excesso)'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          {/* Header de Agradecimento */}
          <Grid size={12}>
            <MainCard
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Stack spacing={3} alignItems="center">
                <TickCircle variant="Bold" size={80} />
                <Typography variant="h1">
                  Obrigado por usar o SmartTrip AI!
                </Typography>
                <Typography variant="h5">
                  Sua viagem foi otimizada com sucesso. Agora confira algumas dicas importantes para sua jornada.
                </Typography>
              </Stack>
            </MainCard>
          </Grid>

          {/* Alerta Importante */}
          <Grid size={12}>
            <Alert severity="info" icon={<InfoCircle variant="Bold" />}>
              <Typography variant="body1" fontWeight="bold">
                Importante: Sempre verifique as exigências atualizadas do país de destino antes de viajar, pois regras podem mudar.
              </Typography>
            </Alert>
          </Grid>

          {/* Itens Essenciais para Mala */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title="🎒 Itens Essenciais para Sua Mala" secondary={<BagTick variant="Bold" />}>
              <List>
                {itensMala.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <TickCircle size={20} style={{ color: '#00C853' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>

          {/* Documentos Necessários */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title="📄 Documentos Necessários" secondary={<Document variant="Bold" />}>
              <List>
                {documentosNecessarios.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <TickCircle size={20} style={{ color: '#2196F3' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>

          {/* Vacinas e Saúde */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title="💉 Vacinas e Cuidados com a Saúde" secondary={<Health variant="Bold" />}>
              <List>
                {vacinasComuns.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <ShieldTick size={20} style={{ color: '#FF9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{
                        fontWeight: item.includes('Consulte') ? 'bold' : 'normal',
                        color: item.includes('Consulte') ? 'warning.main' : 'text.primary'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>

          {/* Itens Proibidos */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title="⚠️ Itens Proibidos em Viagens Aéreas" secondary={<Warning2 variant="Bold" />}>
              <List>
                {itensProibidos.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <MoneyForbidden size={20} style={{ color: '#F44336' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>

          {/* Dicas Extras */}
          <Grid size={12}>
            <MainCard title="💡 Dicas Extras para uma Viagem Tranquila">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6" color="primary">
                      ✈️ No Aeroporto
                    </Typography>
                    <Typography variant="body2">
                      • Chegue com 3 horas de antecedência para voos internacionais
                    </Typography>
                    <Typography variant="body2">
                      • Faça check-in online para economizar tempo
                    </Typography>
                    <Typography variant="body2">
                      • Mantenha documentos de fácil acesso
                    </Typography>
                    <Typography variant="body2">
                      • Etiquete sua bagagem com seus dados
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6" color="primary">
                      🌍 No Destino
                    </Typography>
                    <Typography variant="body2">
                      • Contrate seguro viagem internacional
                    </Typography>
                    <Typography variant="body2">
                      • Tenha sempre cópias dos documentos
                    </Typography>
                    <Typography variant="body2">
                      • Aprenda frases básicas do idioma local
                    </Typography>
                    <Typography variant="body2">
                      • Guarde os contatos de emergência
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6" color="primary">
                      💰 Finanças
                    </Typography>
                    <Typography variant="body2">
                      • Avise seu banco sobre a viagem
                    </Typography>
                    <Typography variant="body2">
                      • Leve múltiplas formas de pagamento
                    </Typography>
                    <Typography variant="body2">
                      • Tenha sempre algum dinheiro em espécie
                    </Typography>
                    <Typography variant="body2">
                      • Cuidado com taxas de câmbio
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Links Úteis */}
          <Grid size={12}>
            <Alert severity="success">
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                Links Úteis para Consulta:
              </Typography>
              <Typography variant="body2">
                • Ministério da Saúde: <strong>saude.gov.br/viajante</strong>
              </Typography>
              <Typography variant="body2">
                • ANVISA - Portos, Aeroportos e Fronteiras: <strong>gov.br/anvisa</strong>
              </Typography>
              <Typography variant="body2">
                • Ministério das Relações Exteriores: <strong>www.gov.br/mre</strong>
              </Typography>
              <Typography variant="body2">
                • ANAC - Regras para Bagagem: <strong>www.gov.br/anac</strong>
              </Typography>
            </Alert>
          </Grid>

          {/* Botão Nova Busca */}
          <Grid size={12}>
            <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="h5" color="text.secondary">
                Pronto para planejar sua próxima viagem?
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Airplane />}
                onClick={() => navigate('/viagens')}
                sx={{ px: 8, py: 2 }}
              >
                Fazer Nova Busca
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
