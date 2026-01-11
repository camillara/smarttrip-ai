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