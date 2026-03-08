import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentsService } from '../services/payments';
import type { CreatePaymentRequest } from '../types';
import { PAYMENT_POLL_INTERVAL } from '../lib/constants';
import toast from 'react-hot-toast';

const PAYMENTS_KEY = ['payments'] as const;

export function usePayments() {
  return useQuery({
    queryKey: PAYMENTS_KEY,
    queryFn: paymentsService.list,
  });
}

export function usePayment(paymentId: string) {
  return useQuery({
    queryKey: [...PAYMENTS_KEY, paymentId],
    queryFn: () => paymentsService.get(paymentId),
    enabled: !!paymentId,
  });
}

export function useCheckoutPayment(paymentId: string) {
  return useQuery({
    queryKey: ['checkout', paymentId],
    queryFn: () => paymentsService.getCheckout(paymentId),
    enabled: !!paymentId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'confirmed' || status === 'expired') return false;
      return PAYMENT_POLL_INTERVAL;
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentRequest) => paymentsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENTS_KEY });
      toast.success('Payment created');
    },
    onError: () => {
      toast.error('Failed to create payment');
    },
  });
}
