import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { Airplane, Location, Calendar, User, Home, Car, Cup, DollarCircle, Setting2 } from 'iconsax-reactjs';

// Lista de cidades disponíveis
const CIDADES_DISPONIVEIS = [
  { value: 'GYN', label: 'Goiânia (GYN)' },
  { value: 'GRU', label: 'São Paulo (GRU)' },
  { value: 'BSB', label: 'Brasília (BSB)' },
  { value: 'ATL', label: 'Atlanta (ATL)' },
  { value: 'ORD', label: 'Chicago (ORD)' },
  { value: 'MSY', label: 'New Orleans (MSY)' }
];

interface TravelFormData {
  data_ida: string;
  data_retorno: string;
  cidade_origem_ida: string;
  cidade_destino: string;
  cidade_origem_retorno: string;
  cidade_destino_retorno: string;
  numero_viajantes: number;
  perfil_viajante: string;
  necessita_hospedagem: boolean;
  categoria_hotel: number;
  necessita_carro: boolean;
  tipo_carro: string;
  incluir_alimentacao: boolean;
  tipo_custo_alimentacao: 'nivel' | 'valor';
  nivel_alimentacao: string;
  valor_diario_alimentacao: number;
  peso_custo: number;
  peso_tempo: number;
  peso_conforto: number;
  orcamento_maximo: number;
}

// ==============================|| SMARTTRIP AI - VIAGENS ||============================== //

export default function SmartTripViagens() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TravelFormData>({
    data_ida: '',
    data_retorno: '',
    cidade_origem_ida: '',
    cidade_destino: '',
    cidade_origem_retorno: '',
    cidade_destino_retorno: '',
    numero_viajantes: 1,
    perfil_viajante: 'padrao',
    necessita_hospedagem: true,
    categoria_hotel: 3,
    necessita_carro: false,
    tipo_carro: 'economico',
    incluir_alimentacao: true,
    tipo_custo_alimentacao: 'nivel',
    nivel_alimentacao: 'medio',
    valor_diario_alimentacao: 0,
    peso_custo: 0.5,
    peso_tempo: 0.3,
    peso_conforto: 0.2,
    orcamento_maximo: 10000
  });

  const handleInputChange = (field: keyof TravelFormData) => (event: any) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSwitchChange = (field: keyof TravelFormData) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  const handleSliderChange = (field: keyof TravelFormData) => (_event: any, value: number | number[]) => {
    setFormData({ ...formData, [field]: value });
  };

  // Obter data de hoje no formato YYYY-MM-DD
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Data mínima para retorno (data de ida ou hoje, o que for maior)
  const getMinReturnDate = () => {
    if (!formData.data_ida) return getToday();
    return formData.data_ida > getToday() ? formData.data_ida : getToday();
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados para o backend
    // Por enquanto, vamos apenas redirecionar para a página de resultados
    navigate('/resultados');
  };

  // Normalizar pesos automaticamente
  const normalizarPesos = () => {
    const total = formData.peso_custo + formData.peso_tempo + formData.peso_conforto;
    if (total > 0) {
      setFormData({
        ...formData,
        peso_custo: formData.peso_custo / total,
        peso_tempo: formData.peso_tempo / total,
        peso_conforto: formData.peso_conforto / total
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          {/* Header */}
          <Grid size={12}>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography variant="h2" color="primary">
                <Airplane variant="Bold" style={{ marginRight: 12, verticalAlign: 'middle' }} />
                Planeje sua Viagem
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Preencha os campos abaixo para encontrar a melhor opção de viagem usando inteligência artificial
              </Typography>
            </Stack>
          </Grid>

          {/* Bloco 1 - Definição da viagem (obrigatório) */}
          <Grid size={12}>
            <MainCard title="1. Dados Gerais da Viagem" secondary={<Calendar variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Data de Ida"
                    type="date"
                    value={formData.data_ida}
                    onChange={handleInputChange('data_ida')}
                    slotProps={{ 
                      inputLabel: { shrink: true },
                      htmlInput: { min: getToday() }
                    }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Data de Retorno"
                    type="date"
                    value={formData.data_retorno}
                    onChange={handleInputChange('data_retorno')}
                    slotProps={{ 
                      inputLabel: { shrink: true },
                      htmlInput: { min: getMinReturnDate() }
                    }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Cidade de Origem (Ida)</InputLabel>
                    <Select value={formData.cidade_origem_ida} onChange={handleInputChange('cidade_origem_ida')} label="Cidade de Origem (Ida)">
                      {CIDADES_DISPONIVEIS.map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Cidade de Destino (Ida)</InputLabel>
                    <Select value={formData.cidade_destino} onChange={handleInputChange('cidade_destino')} label="Cidade de Destino (Ida)">
                      {CIDADES_DISPONIVEIS.map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Cidade de Origem (Retorno)</InputLabel>
                    <Select
                      value={formData.cidade_origem_retorno}
                      onChange={handleInputChange('cidade_origem_retorno')}
                      label="Cidade de Origem (Retorno)"
                    >
                      <MenuItem value="">
                        <em>Mesmo que destino da ida</em>
                      </MenuItem>
                      {CIDADES_DISPONIVEIS.map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Cidade de Destino (Retorno)</InputLabel>
                    <Select
                      value={formData.cidade_destino_retorno}
                      onChange={handleInputChange('cidade_destino_retorno')}
                      label="Cidade de Destino (Retorno)"
                    >
                      <MenuItem value="">
                        <em>Mesmo que origem da ida</em>
                      </MenuItem>
                      {CIDADES_DISPONIVEIS.map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 2 - Perfil do viajante */}
          <Grid size={12}>
            <MainCard title="2. Perfil do Viajante" secondary={<User variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Número de Viajantes"
                    type="number"
                    value={formData.numero_viajantes}
                    onChange={handleInputChange('numero_viajantes')}
                    slotProps={{ htmlInput: { min: 1 } }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Perfil do Viajante</InputLabel>
                    <Select value={formData.perfil_viajante} onChange={handleInputChange('perfil_viajante')} label="Perfil do Viajante">
                      <MenuItem value="economico">Econômico</MenuItem>
                      <MenuItem value="padrao">Padrão</MenuItem>
                      <MenuItem value="conforto">Conforto</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 3 - Hospedagem */}
          <Grid size={12}>
            <MainCard title="3. Hospedagem" secondary={<Home variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch checked={formData.necessita_hospedagem} onChange={handleSwitchChange('necessita_hospedagem')} />}
                    label="Preciso de hospedagem"
                  />
                </Grid>
                {formData.necessita_hospedagem && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Categoria do Hotel</InputLabel>
                        <Select value={formData.categoria_hotel} onChange={handleInputChange('categoria_hotel')} label="Categoria do Hotel">
                          <MenuItem value={1}>1 Estrela</MenuItem>
                          <MenuItem value={2}>2 Estrelas</MenuItem>
                          <MenuItem value={3}>3 Estrelas</MenuItem>
                          <MenuItem value={4}>4 Estrelas</MenuItem>
                          <MenuItem value={5}>5 Estrelas</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 4 - Transporte local */}
          <Grid size={12}>
            <MainCard title="4. Transporte Local (Aluguel de Carro)" secondary={<Car variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch checked={formData.necessita_carro} onChange={handleSwitchChange('necessita_carro')} />}
                    label="Preciso alugar um carro"
                  />
                </Grid>
                {formData.necessita_carro && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Tipo de Carro</InputLabel>
                      <Select value={formData.tipo_carro} onChange={handleInputChange('tipo_carro')} label="Tipo de Carro">
                        <MenuItem value="economico">Econômico</MenuItem>
                        <MenuItem value="sedan">Sedan</MenuItem>
                        <MenuItem value="suv">SUV</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 5 - Alimentação */}
          <Grid size={12}>
            <MainCard title="5. Alimentação" secondary={<Cup variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch checked={formData.incluir_alimentacao} onChange={handleSwitchChange('incluir_alimentacao')} />}
                    label="Incluir custo de alimentação"
                  />
                </Grid>
                {formData.incluir_alimentacao && (
                  <>
                    <Grid size={12}>
                      <FormControl>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant={formData.tipo_custo_alimentacao === 'nivel' ? 'contained' : 'outlined'}
                            onClick={() => setFormData({ ...formData, tipo_custo_alimentacao: 'nivel' })}
                          >
                            Por Nível
                          </Button>
                          <Button
                            variant={formData.tipo_custo_alimentacao === 'valor' ? 'contained' : 'outlined'}
                            onClick={() => setFormData({ ...formData, tipo_custo_alimentacao: 'valor' })}
                          >
                            Por Valor Diário
                          </Button>
                        </Stack>
                      </FormControl>
                    </Grid>
                    {formData.tipo_custo_alimentacao === 'nivel' ? (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                          <InputLabel>Nível de Alimentação</InputLabel>
                          <Select
                            value={formData.nivel_alimentacao}
                            onChange={handleInputChange('nivel_alimentacao')}
                            label="Nível de Alimentação"
                          >
                            <MenuItem value="basico">Básico</MenuItem>
                            <MenuItem value="medio">Médio</MenuItem>
                            <MenuItem value="premium">Premium</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label="Valor Diário por Pessoa (R$)"
                          type="number"
                          value={formData.valor_diario_alimentacao}
                          onChange={handleInputChange('valor_diario_alimentacao')}
                          slotProps={{ htmlInput: { min: 0 } }}
                          helperText="Informe quanto você planeja gastar com alimentação por dia"
                        />
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 6 - Preferências de otimização */}
          <Grid size={12}>
            <MainCard title="6. Preferências de Otimização" secondary={<Setting2 variant="Bold" />}>
              <Stack spacing={4}>
                <Box>
                  <Typography gutterBottom>Peso - Custo: {(formData.peso_custo * 100).toFixed(0)}%</Typography>
                  <Slider
                    value={formData.peso_custo}
                    onChange={handleSliderChange('peso_custo')}
                    step={0.1}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Quanto menor o custo, mais importa
                  </Typography>
                </Box>

                <Box>
                  <Typography gutterBottom>Peso - Tempo: {(formData.peso_tempo * 100).toFixed(0)}%</Typography>
                  <Slider
                    value={formData.peso_tempo}
                    onChange={handleSliderChange('peso_tempo')}
                    step={0.1}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Penaliza viagens longas
                  </Typography>
                </Box>

                <Box>
                  <Typography gutterBottom>Peso - Conforto: {(formData.peso_conforto * 100).toFixed(0)}%</Typography>
                  <Slider
                    value={formData.peso_conforto}
                    onChange={handleSliderChange('peso_conforto')}
                    step={0.1}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Classe do voo, hotel, carro
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={normalizarPesos} sx={{ alignSelf: 'flex-start' }}>
                  Normalizar Pesos
                </Button>

                <Divider />

                <Typography variant="caption" color="text.secondary">
                  Os pesos não precisam somar 1, você pode normalizar internamente
                </Typography>
              </Stack>
            </MainCard>
          </Grid>

          {/* Bloco 7 - Restrições */}
          <Grid size={12}>
            <MainCard title="7. Restrições (Opcional)" secondary={<DollarCircle variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Orçamento Máximo (R$)"
                    type="number"
                    value={formData.orcamento_maximo}
                    onChange={handleInputChange('orcamento_maximo')}
                    slotProps={{ htmlInput: { min: 0 } }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Deixe 0 para não limitar
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Botão de submissão */}
          <Grid size={12}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" size="large" startIcon={<Airplane />} onClick={handleSubmit} sx={{ px: 6, py: 1.5 }}>
                Buscar Melhores Opções
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
