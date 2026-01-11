import { createContext, useContext, useState, ReactNode } from 'react';
import { TravelResult } from 'services/api';

// Interface para resultado combinado (ida + volta)
export interface CombinedTravelResult {
  ida: TravelResult;
  volta: TravelResult | null;
}

interface TripContextData {
  result: CombinedTravelResult | null;
  setResult: (data: CombinedTravelResult | null) => void;
}

const TripContext = createContext<TripContextData | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<CombinedTravelResult | null>(null);

  return (
    <TripContext.Provider value={{ result, setResult }}>
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
