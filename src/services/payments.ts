import { apiClient } from '../lib/axios';
import type {
  Payment,
  CreatePaymentRequest,
  CreatePaymentResponse,
  CheckoutPayment,
} from '../types';

export const paymentsService = {
  async list(): Promise<Payment[]> {
    const { data } = await apiClient.get<Payment[]>('/payments');
    return data;
  },

  async get(paymentId: string): Promise<Payment> {
    const { data } = await apiClient.get<Payment>(`/payments/${paymentId}`);
    return data;
  },

  async create(payload: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const { data } = await apiClient.post<CreatePaymentResponse>('/payments', payload);
    return data;
  },

  async getCheckout(paymentId: string): Promise<CheckoutPayment> {
    const { data } = await apiClient.get<CheckoutPayment>(`/pay/${paymentId}`);
    return data;
  },
};
