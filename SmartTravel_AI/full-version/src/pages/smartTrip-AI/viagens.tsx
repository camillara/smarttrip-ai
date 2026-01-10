import { useState, useEffect } from 'react';
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
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { Airplane, Calendar, Home, Car, Cup, Location, Clock } from 'iconsax-reactjs';

// Lista de cidades disponíveis (extraídas do database.json)
const CIDADES_DISPONIVEIS = [
  { value: 'GYN', label: 'Goiânia (GYN)' },
  { value: 'GRU', label: 'São Paulo (GRU)' },
  { value: 'BSB', label: 'Brasília (BSB)' },
  { value: 'ATL', label: 'Atlanta (ATL)' },
  { value: 'ORD', label: 'Chicago (ORD)' },
  { value: 'MSY', label: 'New Orleans (MSY)' },
  { value: 'MIA', label: 'Miami (MIA)' },
  { value: 'JFK', label: 'Nova York (JFK)' }
];

interface TravelFormData {
  ida_volta: boolean;
  origem: string;
  destino: string;
  locais_visitar: string[];
  data_ida: string;
  data_retorno: string;
  numero_adultos: number;
  numero_criancas: number;
  dias_por_cidade: Record<string, number>;
  incluir_refeicao: boolean;
  incluir_hospedagem: boolean;
  incluir_transporte: boolean;
}

// ==============================|| SMARTTRIP AI - VIAGENS ||============================== //

export default function SmartTripViagens() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TravelFormData>({
    ida_volta: true,
    origem: '',
    destino: '',
    locais_visitar: [],
    data_ida: '',
    data_retorno: '',
    numero_adultos: 1,
    numero_criancas: 0,
    dias_por_cidade: {},
    incluir_refeicao: true,
    incluir_hospedagem: true,
    incluir_transporte: true
  });

  const handleInputChange = (field: keyof TravelFormData) => (event: any) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSwitchChange = (field: keyof TravelFormData) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  // Atualizar locais_visitar quando origem ou destino mudam
  useEffect(() => {
    // Remove origem e destino da lista de locais a visitar
    const locaisAtualizados = formData.locais_visitar.filter(
      (local) => local !== formData.origem && local !== formData.destino
    );
    
    // Só atualiza se houve mudança
    if (locaisAtualizados.length !== formData.locais_visitar.length) {
      setFormData({ ...formData, locais_visitar: locaisAtualizados });
    }
  }, [formData.origem, formData.destino]);

  // Calcular total de dias da viagem
  const getTotalDiasViagem = (): number => {
    if (!formData.data_ida || !formData.data_retorno || !formData.ida_volta) {
      return 0;
    }
    const dataIda = new Date(formData.data_ida);
    const dataRetorno = new Date(formData.data_retorno);
    const diffTime = Math.abs(dataRetorno.getTime() - dataIda.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calcular dias já alocados
  const getDiasAlocados = (): number => {
    return Object.values(formData.dias_por_cidade).reduce((sum, dias) => sum + (dias || 0), 0);
  };

  // Handler para alterar dias de uma cidade
  const handleDiasCidadeChange = (cidade: string) => (event: any) => {
    const dias = parseInt(event.target.value) || 0;
    setFormData({
      ...formData,
      dias_por_cidade: {
        ...formData.dias_por_cidade,
        [cidade]: dias
      }
    });
  };

  // Obter lista de cidades envolvidas na viagem
  const getCidadesViagem = (): string[] => {
    const cidades: string[] = [];
    if (formData.origem) cidades.push(formData.origem);
    if (formData.destino && formData.destino !== formData.origem) cidades.push(formData.destino);
    formData.locais_visitar.forEach((local) => {
      if (!cidades.includes(local)) cidades.push(local);
    });
    return cidades;
  };

  // 
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
    navigate('/resultados');
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

          {/* Bloco 0 - Tipo de Viagem (PRIMEIRO CAMPO) */}
          <Grid size={12}>
            <MainCard title="1. Tipo de Viagem" secondary={<Airplane variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.ida_volta}
                        onChange={handleSwitchChange('ida_volta')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Viagem de ida e volta
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formData.ida_volta ? 'Você selecionará data de retorno' : 'Apenas ida - sem retorno'}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 1 - Dados Gerais da Viagem */}
          <Grid size={12}>
            <MainCard title="2. Dados Gerais da Viagem" secondary={<Location variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Cidade de Origem</InputLabel>
                    <Select value={formData.origem} onChange={handleInputChange('origem')} label="Cidade de Origem">
                      {CIDADES_DISPONIVEIS.filter((cidade) => cidade.value !== formData.destino).map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Cidade de Destino</InputLabel>
                    <Select value={formData.destino} onChange={handleInputChange('destino')} label="Cidade de Destino">
                      {CIDADES_DISPONIVEIS.filter((cidade) => cidade.value !== formData.origem).map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
                    label={formData.ida_volta ? 'Data de Retorno' : 'Data de Retorno (Não Aplicável)'}
                    type="date"
                    value={formData.ida_volta ? formData.data_retorno : ''}
                    onChange={handleInputChange('data_retorno')}
                    slotProps={{
                      inputLabel: { shrink: true },
                      htmlInput: { min: getMinReturnDate() }
                    }}
                    disabled={!formData.ida_volta}
                    required={formData.ida_volta}
                    helperText={!formData.ida_volta ? 'Disponível apenas para viagens de ida e volta' : ''}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Número de Adultos"
                    type="number"
                    value={formData.numero_adultos}
                    onChange={handleInputChange('numero_adultos')}
                    slotProps={{ htmlInput: { min: 1 } }}
                    required
                    helperText="Mínimo 1 adulto"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Número de Crianças"
                    type="number"
                    value={formData.numero_criancas}
                    onChange={handleInputChange('numero_criancas')}
                    slotProps={{ htmlInput: { min: 0 } }}
                    helperText="Opcional"
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 2 - Locais que deseja visitar */}
          <Grid size={12}>
            <MainCard title="3. Locais que Deseja Visitar (Opcional)" secondary={<Calendar variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Cidades</InputLabel>
                    <Select
                      multiple
                      value={formData.locais_visitar}
                      onChange={(event) => {
                        const value = event.target.value as string[];
                        setFormData({ ...formData, locais_visitar: value });
                      }}
                      input={<OutlinedInput label="Cidades" />}
                      renderValue={(selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value: string) => {
                            const cidade = CIDADES_DISPONIVEIS.find((c) => c.value === value);
                            return <Chip key={value} label={cidade?.label || value} size="small" />;
                          })}
                        </Box>
                      )}
                    >
                      {CIDADES_DISPONIVEIS.filter(
                        (cidade) => cidade.value !== formData.origem && cidade.value !== formData.destino
                      ).map((cidade) => (
                        <MenuItem key={cidade.value} value={cidade.value}>
                          {cidade.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Dias por Cidade - Só exibe se houver cidades selecionadas */}
                {formData.locais_visitar.length > 0 && (
                  <>
                    <Grid size={12}>
                      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Dias por Cidade (Opcional)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Defina quantos dias deseja ficar em cada cidade. Deixe em branco para otimização automática.
                      </Typography>
                      {formData.ida_volta && getTotalDiasViagem() > 0 && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography variant="body2">
                              <strong>Total de dias da viagem:</strong> {getTotalDiasViagem()} dias
                            </Typography>
                            <Typography
                              variant="body2"
                              color={getDiasAlocados() > getTotalDiasViagem() ? 'error' : 'success.main'}
                            >
                              <strong>Dias alocados:</strong> {getDiasAlocados()} dias
                            </Typography>
                          </Stack>
                          {getDiasAlocados() > getTotalDiasViagem() && (
                            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                              ⚠️ A soma dos dias excede o total da viagem!
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Grid>
                    {formData.locais_visitar.map((cidade) => {
                      const cidadeInfo = CIDADES_DISPONIVEIS.find((c) => c.value === cidade);
                      return (
                        <Grid key={cidade} size={{ xs: 12, sm: 6, md: 4 }}>
                          <TextField
                            fullWidth
                            label={cidadeInfo?.label || cidade}
                            type="number"
                            value={formData.dias_por_cidade[cidade] || ''}
                            onChange={handleDiasCidadeChange(cidade)}
                            slotProps={{
                              htmlInput: {
                                min: 0,
                                max: getTotalDiasViagem() || undefined
                              }
                            }}
                            helperText="Dias de estadia"
                            error={formData.ida_volta && getDiasAlocados() > getTotalDiasViagem()}
                          />
                        </Grid>
                      );
                    })}
                  </>
                )}
              </Grid>
            </MainCard>
          </Grid>

          {/* Bloco 3 - Incluir na Pesquisa */}
          <Grid size={12}>
            <MainCard title="4. Incluir na Pesquisa" secondary={<Location variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControlLabel
                    control={<Switch checked={formData.incluir_hospedagem} onChange={handleSwitchChange('incluir_hospedagem')} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Home variant="Bold" size={20} />
                        <Typography>Hospedagem</Typography>
                      </Box>
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControlLabel
                    control={<Switch checked={formData.incluir_refeicao} onChange={handleSwitchChange('incluir_refeicao')} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Cup variant="Bold" size={20} />
                        <Typography>Refeições</Typography>
                      </Box>
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControlLabel
                    control={<Switch checked={formData.incluir_transporte} onChange={handleSwitchChange('incluir_transporte')} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Car variant="Bold" size={20} />
                        <Typography>Transporte Local</Typography>
                      </Box>
                    }
                  />
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
