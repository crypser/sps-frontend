import { useQuery } from '@tanstack/react-query';
import { balanceService } from '../services/balance';

export const BALANCE_KEY = ['balance'] as const;

export function useBalance() {
  return useQuery({
    queryKey: BALANCE_KEY,
    queryFn: balanceService.get,
  });
}
