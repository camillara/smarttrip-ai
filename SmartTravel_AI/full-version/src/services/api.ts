// Interface para datas disponíveis
export interface AvailableDates {
  data_minima: string;
  data_maxima: string;
  mensagem: string;
}

// Interface para o payload de viagem
export interface TripPayload {
  ida_volta: boolean;
  origem: string;
  destino: string;
  locais_visitar: string[];
  data_ida: string;
  numero_adultos: number;
  numero_criancas: number;
  dias_por_cidade: Record<string, number>;
  incluir_refeicao: boolean;
  incluir_hospedagem: boolean;
  incluir_transporte: boolean;
  numero_opcoes?: number; // Apenas para /optimize-multiple
}

// Interface para o resultado da otimização
export interface TravelResult {
  rota: {
    origem: string;
    destino: string;
    caminho: string[];
    trechos: Array<{
      origem: string;
      destino: string;
      voo: {
        id: string;
        cia: string;
        codigo: string;
        data: string;
        saida: string;
        duracao_min: number | null;
        preco: number;
      };
    }>;
  };
  custos: {
    total: number;
    voos: number;
    hospedagem: number;
    alimentacao: number;
    transporte: number;
  };
  detalhes: {
    hospedagem: Array<{
      cidade: string;
      diarias: number;
      diaria: number;
      total: number;
    }>;
    alimentacao: Array<{
      cidade: string;
      diarias: number;
      custo_dia: number;
      total: number;
    }>;
    transporte: Array<{
      cidade: string;
      diarias: number;
      custo_dia: number;
      total: number;
    }>;
  };
  metadata?: {
    nivel_otimizacao: 'otima' | 'boa' | 'viavel' | 'basica' | 'erro';
    nota: string;
    tempo_computacao: number;
  };
}

// Interface para pontuação de uma opção
export interface Pontuacao {
  custo: number;
  tempo: number;
  conforto: number;
  geral: number;
}

// Interface para uma opção de viagem (modo múltiplo)
export interface OpcaoViagem {
  id: number;
  ranking: number;
  titulo: string;
  descricao: string;
  rota: TravelResult['rota'];
  custos: TravelResult['custos'];
  detalhes: TravelResult['detalhes'];
  custo_total: number;
  tempo_total_viagem: number;
  numero_escalas: number;
  pontuacao: Pontuacao;
  vantagens: string[];
  desvantagens: string[];
}

// Interface para o resultado de otimização múltipla
export interface MultipleOptimizeResponse {
  opcoes: OpcaoViagem[];
  recomendacao: number;
  metadata: {
    tempo_computacao: number;
    numero_opcoes_geradas: number;
    numero_opcoes_solicitadas: number;
  };
}

// Função para buscar datas disponíveis
export async function getAvailableDates(): Promise<AvailableDates> {
  const response = await fetch("http://127.0.0.1:8000/available-dates");

  if (!response.ok) {
    throw new Error("Erro ao buscar datas disponíveis");
  }

  return response.json();
}

// Função para otimizar viagem (chamada única ao backend)
export async function optimizeTrip(payload: TripPayload): Promise<TravelResult> {
  const response = await fetch("http://127.0.0.1:8000/optimize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Erro desconhecido" }));
    throw new Error(error.detail || "Erro ao otimizar viagem");
  }

  return response.json();
}

// Função para otimizar viagem com múltiplas opções
export async function optimizeTripMultiple(payload: TripPayload): Promise<MultipleOptimizeResponse> {
  const payloadWithOptions = { ...payload, numero_opcoes: 3 };
  
  const response = await fetch("http://127.0.0.1:8000/optimize-multiple", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadWithOptions),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Erro desconhecido" }));
    throw new Error(error.detail || "Erro ao otimizar viagem");
  }

  return response.json();
}

// Tipo para modo de busca
export type SearchMode = 'single' | 'multiple';

// Função unificada para otimizar viagem
export async function optimizeTripWithMode(
  payload: TripPayload,
  mode: SearchMode
): Promise<TravelResult | MultipleOptimizeResponse> {
  if (mode === 'single') {
    return optimizeTrip(payload);
  } else {
    return optimizeTripMultiple(payload);
  }
}

// Função para otimizar viagem completa (ida + volta)
export async function optimizeCompleteTrip(
  payloadIda: TripPayload,
  payloadVolta: TripPayload | null
): Promise<{ ida: TravelResult; volta: TravelResult | null }> {
  try {
    // Faz a chamada para a viagem de ida
    const resultadoIda = await optimizeTrip(payloadIda);

    // Se houver volta, faz a segunda chamada
    let resultadoVolta: TravelResult | null = null;
    if (payloadVolta) {
      resultadoVolta = await optimizeTrip(payloadVolta);
    }

    return {
      ida: resultadoIda,
      volta: resultadoVolta,
    };
  } catch (error) {
    console.error("Erro ao otimizar viagem:", error);
    throw error;
  }
}