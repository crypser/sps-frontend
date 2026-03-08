import { apiClient } from '../lib/axios';
import type { AuthChallengeResponse, AuthVerifyResponse } from '../types';

export const authService = {
  async getChallenge(wallet: string): Promise<AuthChallengeResponse> {
    const { data } = await apiClient.post<AuthChallengeResponse>('/auth/challenge', {
      wallet,
    });
    return data;
  },

  async verify(
    wallet: string,
    signature: string,
    message: string,
  ): Promise<AuthVerifyResponse> {
    const { data } = await apiClient.post<AuthVerifyResponse>('/auth/verify', {
      wallet,
      signature,
      message,
    });
    return data;
  },
};
