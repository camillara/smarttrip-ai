import { createContext, useContext, useState, ReactNode } from 'react';
import { TravelResult, MultipleOptimizeResponse, SearchMode } from 'services/api';

// Interface para resultado combinado (ida + volta)
export interface CombinedTravelResult {
  ida: TravelResult;
  volta: TravelResult | null;
}

// Interface para resultado múltiplo combinado
export interface CombinedMultipleResult {
  ida: MultipleOptimizeResponse;
  volta: MultipleOptimizeResponse | null;
}

interface TripContextData {
  result: CombinedTravelResult | null;
  multipleResult: CombinedMultipleResult | null;
  searchMode: SearchMode;
  setResult: (data: CombinedTravelResult | null) => void;
  setMultipleResult: (data: CombinedMultipleResult | null) => void;
  setSearchMode: (mode: SearchMode) => void;
}

const TripContext = createContext<TripContextData | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<CombinedTravelResult | null>(null);
  const [multipleResult, setMultipleResult] = useState<CombinedMultipleResult | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('multiple');

  return (
    <TripContext.Provider value={{ result, multipleResult, searchMode, setResult, setMultipleResult, setSearchMode }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
