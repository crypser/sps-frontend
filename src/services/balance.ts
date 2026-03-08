import { apiClient } from '../lib/axios';
import type { Balance } from '../types';

export const balanceService = {
  async get(): Promise<Balance> {
    const { data } = await apiClient.get<Balance>('/balance');
    return data;
  },
};
