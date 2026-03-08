import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { withdrawalsService } from '../services/withdrawals';
import type { CreateWithdrawalRequest } from '../types';
import { BALANCE_KEY } from './use-balance';
import toast from 'react-hot-toast';

const WITHDRAWALS_KEY = ['withdrawals'] as const;

export function useWithdrawals() {
  return useQuery({
    queryKey: WITHDRAWALS_KEY,
    queryFn: withdrawalsService.list,
  });
}

export function useCreateWithdrawal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWithdrawalRequest) => withdrawalsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WITHDRAWALS_KEY });
      queryClient.invalidateQueries({ queryKey: BALANCE_KEY });
      toast.success('Withdrawal requested');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.error ?? 'Failed to create withdrawal';
      toast.error(message);
    },
  });
}
