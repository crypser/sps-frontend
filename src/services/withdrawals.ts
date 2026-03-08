import { apiClient } from '../lib/axios';
import type {
  Withdrawal,
  CreateWithdrawalRequest,
  CreateWithdrawalResponse,
} from '../types';

export const withdrawalsService = {
  async list(): Promise<Withdrawal[]> {
    const { data } = await apiClient.get<Withdrawal[]>('/withdrawals');
    return data;
  },

  async get(id: string): Promise<Withdrawal> {
    const { data } = await apiClient.get<Withdrawal>(`/withdrawals/${id}`);
    return data;
  },

  async create(payload: CreateWithdrawalRequest): Promise<CreateWithdrawalResponse> {
    const { data } = await apiClient.post<CreateWithdrawalResponse>('/withdrawals', payload);
    return data;
  },
};
