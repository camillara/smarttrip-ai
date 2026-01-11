import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  optimizeCompleteTrip, 
  getAvailableDates, 
  optimizeTripWithMode,
  type AvailableDates, 
  type SearchMode,
  type TravelResult,
  type MultipleOptimizeResponse 
} from 'services/api';
import { useTrip } from 'contexts/TripContext';

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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Alert from '@mui/material/Alert';

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
  origem_volta: string; // De qual cidade parte na volta
  destino_volta: string; // Para qual cidade vai na volta
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
  const { setResult, setMultipleResult, setSearchMode: setContextSearchMode } = useTrip();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDates, setLoadingDates] = useState<boolean>(true);
  const [availableDates, setAvailableDates] = useState<AvailableDates | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('multiple');
  const [formData, setFormData] = useState<TravelFormData>({
    ida_volta: true,
    origem: '',
    destino: '',
    locais_visitar: [],
    data_ida: '',
    data_retorno: '',
    origem_volta: '',
    destino_volta: '',
    numero_adultos: 1,
    numero_criancas: 0,
    dias_por_cidade: {},
    incluir_refeicao: true,
    incluir_hospedagem: true,
    incluir_transporte: true
  });

  // Buscar datas disponíveis ao carregar o componente
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoadingDates(true);
        const dates = await getAvailableDates();
        setAvailableDates(dates);
      } catch (error) {
        console.error('Erro ao buscar datas disponíveis:', error);
        alert('Erro ao buscar datas disponíveis. Usando datas padrão.');
      } finally {
        setLoadingDates(false);
      }
    };

    fetchAvailableDates();
  }, []);

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
    const locaisAtualizados = formData.locais_visitar.filter((local) => local !== formData.origem && local !== formData.destino);

    // Limpa origem_volta se não estiver mais disponível
    const cidadesPartidasVolta = [formData.destino, ...formData.locais_visitar];
    if (formData.origem_volta && !cidadesPartidasVolta.includes(formData.origem_volta)) {
      setFormData({ ...formData, locais_visitar: locaisAtualizados, origem_volta: '', destino_volta: '' });
      return;
    }

    // Limpa destino_volta se não estiver mais disponível
    const cidadesProibidas = [formData.origem, formData.destino, ...formData.locais_visitar];
    if (formData.destino_volta && cidadesProibidas.includes(formData.destino_volta)) {
      setFormData({ ...formData, locais_visitar: locaisAtualizados, destino_volta: '' });
      return;
    }

    // Só atualiza se houve mudança
    if (locaisAtualizados.length !== formData.locais_visitar.length) {
      setFormData({ ...formData, locais_visitar: locaisAtualizados });
    }
  }, [formData.origem, formData.destino, formData.locais_visitar]);

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
  // Obter data mínima disponível da API ou data de hoje como fallback
  const getMinDate = () => {
    if (availableDates?.data_minima) {
      return availableDates.data_minima;
    }
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Obter data máxima disponível da API
  const getMaxDate = () => {
    return availableDates?.data_maxima || undefined;
  };

  // Data mínima para retorno (data de ida ou data mínima da API, o que for maior)
  const getMinReturnDate = () => {
    if (!formData.data_ida) return getMinDate();
    return formData.data_ida > getMinDate() ? formData.data_ida : getMinDate();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payloadIda = {
        ida_volta: false,
        origem: formData.origem,
        destino: formData.destino,
        locais_visitar: formData.locais_visitar,
        data_ida: formData.data_ida,
        numero_adultos: formData.numero_adultos,
        numero_criancas: formData.numero_criancas,
        dias_por_cidade: formData.dias_por_cidade,
        incluir_refeicao: formData.incluir_refeicao,
        incluir_hospedagem: formData.incluir_hospedagem,
        incluir_transporte: formData.incluir_transporte
      };

      let payloadVolta = null;

      if (formData.ida_volta) {
        payloadVolta = {
          ida_volta: false,
          origem: formData.origem_volta,
          destino: formData.destino_volta,
          locais_visitar: [],
          data_ida: formData.data_retorno,
          numero_adultos: formData.numero_adultos,
          numero_criancas: formData.numero_criancas,
          dias_por_cidade: {},
          incluir_refeicao: false,
          incluir_hospedagem: false,
          incluir_transporte: false
        };
      }

      // Chama a API de acordo com o modo selecionado
      const resultadoIda = await optimizeTripWithMode(payloadIda, searchMode);
      let resultadoVolta = null;

      if (payloadVolta) {
        resultadoVolta = await optimizeTripWithMode(payloadVolta, searchMode);
      }

      // Salva no contexto de acordo com o tipo de resultado
      setContextSearchMode(searchMode);

      if (searchMode === 'single') {
        setResult({
          ida: resultadoIda as TravelResult,
          volta: resultadoVolta as TravelResult | null
        });
        setMultipleResult(null);
      } else {
        setMultipleResult({
          ida: resultadoIda as MultipleOptimizeResponse,
          volta: resultadoVolta as MultipleOptimizeResponse | null
        });
        setResult(null);
      }

      navigate('/resultados');
    } catch (error) {
      console.error('Erro ao otimizar viagem:', error);
      alert('Erro ao otimizar viagem. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
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

          {/* Modo de Busca */}
          <Grid size={12}>
            <MainCard>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  🎯 Modo de Busca
                </Typography>
                <RadioGroup
                  value={searchMode}
                  onChange={(e) => setSearchMode(e.target.value as SearchMode)}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: searchMode === 'single' ? 'primary.main' : 'divider',
                        backgroundColor: searchMode === 'single' ? 'primary.lighter' : 'background.paper',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2
                        }
                      }}
                      onClick={() => setSearchMode('single')}
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1" fontWeight={700}>
                              🎯 Resultado Otimizado
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Retorna a melhor rota encontrada em até 60 segundos. Ideal para buscas rápidas.
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: searchMode === 'multiple' ? 'primary.main' : 'divider',
                        backgroundColor: searchMode === 'multiple' ? 'primary.lighter' : 'background.paper',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2
                        }
                      }}
                      onClick={() => setSearchMode('multiple')}
                    >
                      <FormControlLabel
                        value="multiple"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1" fontWeight={700}>
                              📊 Comparar 3 Opções (Recomendado)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Retorna 3 opções diferentes para você escolher (1-3 minutos). Melhor para análise detalhada.
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Box>
                  </Stack>
                </RadioGroup>

                {searchMode === 'multiple' && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Dica:</strong> O modo de comparação gera diferentes combinações de rotas para você avaliar qual se adequa melhor às suas necessidades.
                  </Alert>
                )}
              </Box>
            </MainCard>
          </Grid>

          {/* Bloco 0 - Tipo de Viagem (PRIMEIRO CAMPO) */}
          <Grid size={12}>
            <MainCard title="1. Tipo de Viagem" secondary={<Airplane variant="Bold" />}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch checked={formData.ida_volta} onChange={handleSwitchChange('ida_volta')} color="primary" />}
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
                      htmlInput: { 
                        min: getMinDate(),
                        max: getMaxDate()
                      }
                    }}
                    disabled={loadingDates}
                    required
                    helperText={loadingDates ? 'Carregando datas disponíveis...' : availableDates?.mensagem}
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
                      htmlInput: { 
                        min: getMinReturnDate(),
                        max: getMaxDate()
                      }
                    }}
                    disabled={!formData.ida_volta || loadingDates}
                    required={formData.ida_volta}
                    helperText={
                      !formData.ida_volta 
                        ? 'Disponível apenas para viagens de ida e volta' 
                        : loadingDates 
                        ? 'Carregando datas disponíveis...' 
                        : ''
                    }
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
                      {CIDADES_DISPONIVEIS.filter((cidade) => cidade.value !== formData.origem && cidade.value !== formData.destino).map(
                        (cidade) => (
                          <MenuItem key={cidade.value} value={cidade.value}>
                            {cidade.label}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Dias por Cidade - Exibe destino + cidades intermediárias */}
                {(formData.destino || formData.locais_visitar.length > 0) && (
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
                            <Typography variant="body2" color={getDiasAlocados() > getTotalDiasViagem() ? 'error' : 'success.main'}>
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

                    {/* Campo para cidade de destino */}
                    {formData.destino && (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                          fullWidth
                          label={`${CIDADES_DISPONIVEIS.find((c) => c.value === formData.destino)?.label || formData.destino} (Destino)`}
                          type="number"
                          value={formData.dias_por_cidade[formData.destino] || ''}
                          onChange={handleDiasCidadeChange(formData.destino)}
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
                    )}

                    {/* Campos para cidades intermediárias */}
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

          {/* Bloco 3 - Dados da Volta (apenas se ida_volta = true) */}
          {formData.ida_volta && (
            <Grid size={12}>
              <MainCard title="4. Dados da Volta" secondary={<Airplane variant="Bold" />}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>De Qual Cidade Parte na Volta</InputLabel>
                      <Select
                        value={formData.origem_volta}
                        onChange={handleInputChange('origem_volta')}
                        label="De Qual Cidade Parte na Volta"
                      >
                        {/* Pode partir do destino */}
                        {formData.destino && (
                          <MenuItem value={formData.destino}>
                            {CIDADES_DISPONIVEIS.find((c) => c.value === formData.destino)?.label}
                          </MenuItem>
                        )}
                        {/* Pode partir de qualquer cidade que está visitando */}
                        {formData.locais_visitar.map((cidade) => {
                          const cidadeInfo = CIDADES_DISPONIVEIS.find((c) => c.value === cidade);
                          return (
                            <MenuItem key={cidade} value={cidade}>
                              {cidadeInfo?.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Para Qual Cidade Vai na Volta</InputLabel>
                      <Select
                        value={formData.destino_volta}
                        onChange={handleInputChange('destino_volta')}
                        label="Para Qual Cidade Vai na Volta"
                      >
                        {/* Não pode ser: destino, nem locais_visitar (mas pode ser origem) */}
                        {CIDADES_DISPONIVEIS.filter(
                          (cidade) =>
                            cidade.value !== formData.destino &&
                            !formData.locais_visitar.includes(cidade.value)
                        ).map((cidade) => (
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
          )}

          {/* Bloco 4 - Incluir na Pesquisa */}
          <Grid size={12}>
            <MainCard
              title={formData.ida_volta ? '5. Incluir na Pesquisa' : '4. Incluir na Pesquisa'}
              secondary={<Location variant="Bold" />}
            >
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
            <Stack spacing={2} alignItems="center">
              <Button 
                variant="contained" 
                size="large" 
                startIcon={loading ? <Clock variant="Bold" /> : <Airplane variant="Bold" />}
                onClick={handleSubmit} 
                disabled={loading}
                sx={{ px: 6, py: 1.5 }}
              >
                {loading ? (
                  searchMode === 'single' 
                    ? '⏳ Buscando viagem...' 
                    : '⏳ Gerando 3 opções...'
                ) : (
                  '🔍 Buscar Viagens'
                )}
              </Button>
              {loading && (
                <Typography variant="body2" color="text.secondary">
                  {searchMode === 'single' 
                    ? 'Otimizando sua viagem. Isso pode levar até 60 segundos...'
                    : 'Gerando 3 opções para você comparar. Isso pode levar de 1 a 3 minutos...'}
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
